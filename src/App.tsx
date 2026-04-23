import React, { Component, ChangeEvent, ReactNode } from "react";
import "./App.css";
import Cards, { CardMap, ImmutableCard, CardValue } from "./Cards";
import SessionStorage from "./SessionStorage";
import { Load, Download } from "./Save";

import { Map, List, fromJS } from "immutable";

// TODO limit undo history to a certain number of steps (30?)
// game log?
// view byregion
// card count

type Presence = "deck" | "inhand" | "ophand" | "discarded" | "removed" | "infrontofus";

// The app state is an immutable Map. We use `any` for the value type because
// fromJS() produces deeply nested structures and the values are heterogeneous
// (strings, numbers, booleans, nulls, nested Maps). The alternative would be
// rewriting all state access to use plain objects or immutable Records.
type AppData = Map<string, any>;

// Per-card state as stored in the save file / app state
type CardStateMap = Map<string, Map<string, Presence>>;

interface CardProps {
  id: string;
  side: string;
  ops: number;
  event: boolean;
  name: string;
  onNameClick: (id: string) => void;
  onDiscard: (id: string) => void;
  onRemove: (id: string) => void;
}

function Card({
  id,
  side,
  ops,
  event,
  name,
  onNameClick,
  onDiscard,
  onRemove,
}: CardProps) {
    return (
      <li
        className={"card " + side}
        onClick={e => {
          e.stopPropagation();
          onNameClick(id);
        }}
      >
        <i
          className={"remove fas" + (id == "shutt" ? " fa-flag" : " fa-ban") + (event || id === "shutt" ? "" : " hidden")}
          onClick={e => {
            e.stopPropagation();
            onRemove(id);
          }}
        />
        <i
          className="discard fas fa-arrow-circle-down"
          onClick={e => {
            e.stopPropagation();
            onDiscard(id);
          }}
        />
        {
          ops == null ?
            <i className="score fas fa-star-half-alt" />
          : "\u00A0" + ops
        }
        {" "}
        {name}
      </li>
    );
}

const defaultComparator = (a: CardValue, b: CardValue) => (a! > b! ? 1 : a! < b! ? -1 : 0);

interface AppState {
  data: AppData;
}

class App extends Component<Record<string, never>, AppState> {
  storage: boolean;
  sorts: string[];
  filters: string[];
  views: string[];
  languages: { id: string; name: string }[];
  allCards: CardMap;

  appSaveState = (f: (data: AppData) => AppData) => this.setState(({ data }) => ({ data: SessionStorage.set(f(data)) }));
  appNoSaveState = (f: (data: AppData) => AppData) => this.setState(({ data }) => ({ data: f(data) }));

  changePhase = () => this.appSaveState(st => st.update("phase", (p: number) => (p < 3 ? p + 1 : 1)).set("lastState", st));

  toggleCardNames = () => this.appNoSaveState(st => st.update("shortCardNames", (old: boolean) => !old));

  toggleUSSR = () =>
    this.appNoSaveState(st => st.update("ussrSelected", (oldside: string | null) => (oldside !== "ussr" ? "ussr" : null)));

  setSort = (event: ChangeEvent<HTMLSelectElement>) => {
    const ns = event.target.value;
    this.appNoSaveState(st => st.set("sortBy", ns));
  };

  setFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    const nf = event.target.value;
    this.appNoSaveState(st => st.set("filterBy", nf));
  };

  setView = (event: ChangeEvent<HTMLSelectElement>) => {
    const nv = event.target.value;
    this.appNoSaveState(st => st.set("viewBy", nv));
  };

  setLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
    const lang = event.target.value;
    this.appSaveState(st => st.set("language", lang));
  };

  reset = () =>
    this.appSaveState(st =>
      App.initialState(this.allCards)
        .set("sortBy", st.get("sortBy"))
        .set("filterBy", st.get("filterBy"))
        .set("viewBy", st.get("viewBy"))
        .set("shortCardNames", st.get("shortCardNames"))
    );

  undo = () =>
    this.appSaveState(
      st =>
        !st.get("lastState")
          ? st
          : st
              .get("lastState")
              .set("sortBy", st.get("sortBy"))
              .set("filterBy", st.get("filterBy"))
              .set("viewBy", st.get("viewBy"))
              .set("shortCardNames", st.get("shortCardNames"))
              .set("ussrSelected", st.get("ussrSelected"))
    );

  addDiscards = () => {
    this.appSaveState(st =>
      st
        .update("cardStates", (cs: CardStateMap) =>
          cs.map((c, k) =>
            c.update(
              "presence",
              (presence) =>
                presence === "discarded"
                  ? "deck"
                  : presence === "deck" && this.phaseFilter(this.allCards.get(k)!)
                    ? "ophand"
                    : presence
            )
          )
        )
        .set("lastState", st)
    );
  };

  onNameClick = (card: string) => {
    const hand = this.state.data.get("ussrSelected") === "ussr" ? "ophand" : "inhand";
    const pres = this.state.data.getIn(["cardStates", card, "presence"]);
    return this.moveCard(card, pres === "deck" ? hand : "deck");
  };
  discardCard = (card: string) => this.moveCard(card, "discarded");
  removeCard = (card: string) => {

    // shuttle diplomacy does not get removed, it gets put in front of the us until a mideast scoring
    // card is played, then it is discarded.
    if (card == "shutt") {
      this.moveCard(card, "infrontofus");
    }
    else {
      this.moveCard(card, "removed");
    }
  }

  moveCard = (card: string, to: Presence) => this.appSaveState(st => st.setIn(["cardStates", card, "presence"], to).set("lastState", st));

  cardClicked = (card: string) =>
    this.appSaveState(st => {
      return st.updateIn(["cardStates", card, "presence"], (presence: unknown) => {
        switch (presence) {
          case "deck":
            return "inhand";
          case "inhand":
            return "ophand";
          case "ophand":
            return "inhand";
          case "discarded":
            return this.allCards.getIn([card, "event"]) ? "removed" : presence;
          default:
            return presence;
        }
      }).set("lastState", st);
    });

  nextPhaseVisibility = () => this.state.data.get("phase") < 3;

  language = (): string => this.state.data.get("language")

  deckContainer = (legend: string, cl: string, content: ReactNode) => {
    return (
      <fieldset className={cl}>
      <legend>{legend}</legend>
      {content}
      </fieldset>
    );
  };

  nextPhaseLabel = () => {
    switch (this.state.data.get("phase")) {
      case 1:
        return "add mid war";
      default:
        return "add late war";
    }
  };

  static initialState = (allCards: CardMap): AppData =>
    Map({
      language: "en",
      cardStates: allCards.map(() => Map({ presence: "deck" })),
      viewBy: "byside",
      sortBy: "importance",
      filterBy: "all",
      showDiscards: true,
      phase: 1, // 1 = early, 2 = mid, 3 = late
      ussrSelected: null,
      shortCardNames: false,
      lastState: null
    });

  constructor(props: Record<string, never>) {
    super(props);

    this.storage = SessionStorage.storageAvailable("sessionStorage");

    this.sorts = ["name", "importance", "ops", "playdek"];
    this.filters = [
      "all",
      "most important 15",
      "scoring",
      "us",
      "ussr",
      "neutral",
      "us or neutral",
      "ussr or neutral",
      "nonscoring",
      "2ops+",
      "3ops+",
      "4ops+"
    ];
    this.views = ["byside", "region", "category"];
    this.languages = [
      {id: "en", name: "english"},
      {id: "cn", name: "中文"}
    ];

    this.allCards = Cards.cards();

    this.cardClicked = this.cardClicked.bind(this);

    this.state = {
      data: this.storage && SessionStorage.has() ? fromJS(SessionStorage.get()) as AppData : App.initialState(this.allCards)
    };
  }

  phaseFilter = (card: ImmutableCard) => {
    const phase = this.state.data.get("phase") as number;
    return phase >= 3 || (phase >= 2 && !card.get("late")) || (phase === 1 && card.get("early"));
  };

  cards = () => {
    let c = this.allCards.filter((c: ImmutableCard) => this.phaseFilter(c));
    // TODO filter by most important that are not "gone"
    if (this.state.data.get("filterBy") === "most important 15") {
      c = c
        .filter((_c: ImmutableCard, k: string) => {
          const pres = this.state.data.getIn(["cardStates", k, "presence"]);
          return pres !== "removed" && pres !== "discarded" && pres !== "inhand" && pres !== "gone";
        })
        .sortBy((c: ImmutableCard) => Cards.cardRanking().count() - (c.get("importance") as number))
        .take(15) as CardMap;
    }
    const language = this.state.data.get("language") as string;
    const lang_id = language === "en" ? "name" : language;

    return c
      .sort((c1: ImmutableCard, c2: ImmutableCard) => {
        switch (this.state.data.get("sortBy")) {
          case "all":
            return 0;
          case "ops":
            return defaultComparator(c2.get("ops"), c1.get("ops"));
          case "name":
            return defaultComparator((c1.get(lang_id) as string).toLowerCase(), (c2.get(lang_id) as string).toLowerCase());
          case "importance":
            return defaultComparator(c2.get("importance"), c1.get("importance"));
          case "playdek":
            // scoring cards first
            const score1 = c1.get("scoringcard");
            const score2 = c2.get("scoringcard");
            if ((score1 === score2) === null) return 0;
            else if (score1) return -1;
            else if (score2) return 1;

            // sides - us -> ussr -> neutral
            const side1 = c1.get("side");
            const side2 = c2.get("side");
            if (side1 !== side2) {
              if (side1 === "us") return -1;
              else if (side2 === "us") return 1;
              else if (side1 === "ussr") return -1;
              else if (side2 === "ussr") return 1;
            }

            // all else equal, sort by ops ascending
            const ops = defaultComparator(c1.get("ops"), c2.get("ops"));
            if (ops !== 0) return ops;

            // playdek doesn't actually sort by name, but I don't see any
            // consistent way to break ties.
            return defaultComparator((c1.get("name") as string).toLowerCase(), (c2.get("name") as string).toLowerCase());
          default:
            return 0;
        }
      })
      .filter((c: ImmutableCard) => {
        switch (this.state.data.get("filterBy")) {
          case "scoring":
            return c.get("scoringcard");
          case "nonscoring":
            return !c.get("scoringcard");
          case "2ops+":
            return (c.get("ops") as number) >= 2;
          case "3ops+":
            return (c.get("ops") as number) >= 3;
          case "4ops+":
            return (c.get("ops") as number) >= 4;
          case "us":
            return c.get("side") === "us";
          case "ussr":
            return c.get("side") === "ussr";
          case "neutral":
            return c.get("side") === "neutral";
          case "us or neutral":
            return c.get("side") === "neutral" || c.get("side") === "us";
          case "ussr or neutral":
            return c.get("side") === "neutral" || c.get("side") === "ussr";
          default:
            return true;
        }
      })
      .sortBy((_c: ImmutableCard, k: string) => {
        const pres = this.state.data.getIn(["cardStates", k, "presence"]);
        return pres === "discarded" ? 1 : 0;
      });
  };

  renderCard = (k: string, c: ImmutableCard) => {
    const language = this.state.data.get("language") as string;
    const lang_id = language === "en" ? "name" : language;
    return (<Card
      key={k}
      id={k}
      side={c.get("side") as string}
      ops={c.get("ops") as number}
      event={c.get("event") as boolean}
      name={this.state.data.get("shortCardNames") ? k : c.get(lang_id) as string}
      onNameClick={this.onNameClick}
      onDiscard={this.discardCard}
      onRemove={this.removeCard}
    />)
  };

  renderByCategory() {
    // TODO this and top of renderByRegion are complete copy paste
    const cards = this.cards();
    const regInfo = Cards.cardRegions(
      (this.state.data.get("cardStates") as CardStateMap)
        .filter(c => c.get("presence") === "removed")
        .keySeq()
        .toSet(),
      (this.state.data.get("cardStates") as CardStateMap)
        .filter((c, k) =>
            c.get("presence") === "discarded" &&
            this.allCards.getIn([k, "side"]) !== "ussr" &&
            !this.allCards.getIn([k, "scoringcard"])
        )
        .keySeq()
        .toSet(),
      this.state.data.get("phase") as number
    );

    const f = (category: string) =>
      cards
        .filter((_c: ImmutableCard, k: string) => regInfo.get(category)!.has(k))
        .filter((_c: ImmutableCard, k: string) => {
          const pres = this.state.data.getIn(["cardStates", k, "presence"]);
          return pres === "deck";
        })
        .map((c: ImmutableCard, k: string) => this.renderCard(k, c))
        .toList();

    const suicide = { cat: "suicide", data: f("suicide") };
    const defconimpr = { cat: "defcon improve", data: f("defconimprovers") };
    const defcondegr = { cat: "hl defcon degrade", data: f("defconincreasers") };
    const badcarddisc = { cat: "bad card discard", data: f("badcarddiscarders") };
    const warcards = { cat: "war cards", data: f("warcards") };
    const china = { cat: "china card", data: f("china") };
    const cardstealers = { cat: "card stealers", data: f("cardstealers") };

    const content = [suicide, defconimpr, defcondegr, badcarddisc, warcards, china, cardstealers].map(
      ({ cat, data }) => (
        <fieldset key={cat} className="cardCol">
          <legend>{cat} ({data.count()})</legend>
          <ul>{data}</ul>
        </fieldset>
      )
    );
    return <div className="collapseedges">{this.deckContainer("deck", "bycategory", content)}</div>;
  }

  renderByRegion() {
    const cards = this.cards();
    const regInfo = Cards.cardRegions(
      (this.state.data.get("cardStates") as CardStateMap)
        .filter(c => c.get("presence") === "removed")
        .keySeq()
        .toSet(),
      (this.state.data.get("cardStates") as CardStateMap)
        .filter((c, k) =>
            c.get("presence") === "discarded" &&
            this.allCards.getIn([k, "side"]) !== "ussr" &&
            !this.allCards.getIn([k, "scoringcard"])
        )
        .keySeq()
        .toSet(),
      this.state.data.get("phase") as number
    );

    const f = (region: string) =>
      cards
        .filter((_c: ImmutableCard, k: string) => regInfo.get(region)!.has(k) || regInfo.get("all")!.has(k))
        .filter((_c: ImmutableCard, k: string) => {
          const pres = this.state.data.getIn(["cardStates", k, "presence"]);
          return pres === "deck";
        })
        .map((c: ImmutableCard, k: string) => this.renderCard(k, c))
        .toList();

    let eu = { region: "europe", data: f("eu") };
    let mid = { region: "middle east", data: f("me") };
    let asia = { region: "asia", data: f("as") };
    let sea = { region: "south east asia", data: f("sea") };
    let afr = { region: "africa", data: f("af") };
    let sa = { region: "south america", data: f("sa") };
    let ca = { region: "central america", data: f("ca") };
    const content = [eu, mid, asia, sea, afr, sa, ca].map(({ region, data }) => (
      <fieldset key={region} className="cardCol">
        <legend>{region} ({data.count()})</legend>
        <ul>{data}</ul>
      </fieldset>
    ));

    return <div className="collapseedges">{this.deckContainer("deck", "byregion", content)}</div>;
  }

  renderBySide() {
    const cards = this.cards();
    const f = (side: string) =>
      cards
        .filter((c: ImmutableCard) => c.get("side") === side)
        .filter((_c: ImmutableCard, k: string) => {
          const pres = this.state.data.getIn(["cardStates", k, "presence"]);
          return pres !== "inhand" && pres !== "ophand" && pres !== "discarded" && pres !== "removed" && pres !== "infrontofus";
        })
        .map((c: ImmutableCard, k: string) => this.renderCard(k, c))
        .toList();

    const us = { side: "us", data: f("us") };
    const neutral = { side: "neutral", data: f("neutral") };
    const ussr = { side: "ussr", data: f("ussr") };

    const content = [us, neutral, ussr].map(({ side, data }) => (
      <div key={side} className="cardCol">
        <fieldset>
          <legend>{side} ({data.count()})</legend>
          <ul>{data}</ul>
        </fieldset>
      </div>
    ));

    return <div className="collapseedges">{this.deckContainer("deck", "byside", content)}</div>;
  }

  renderDiscardRemoved = () => {
    const keep = (pres: Presence) =>
      this.cards()
        .filter((_c: ImmutableCard, k: string) => {
          return this.state.data.getIn(["cardStates", k, "presence"]) === pres;
        })
        .map((c: ImmutableCard, k: string) => this.renderCard(k, c))
        .toList();

    const discards = keep("discarded");
    const removes = keep("removed");
    const infrontofus = keep("infrontofus");

    const content = [
      { name: "removed", data: removes },
      { name: "discarded", data: discards },
      infrontofus.count() ? { name: "infrontofus", data: infrontofus } : null
    ].filter((c): c is { name: string; data: List<React.JSX.Element> } => c !== null).map(c => (
      <div key={c.name} id={c.name} className="cardCol">
        <fieldset>
          <legend>{c.name} ({c.data.count()})</legend>
          <ul>{c.data}</ul>
        </fieldset>
      </div>
    ));
    return this.deckContainer("gone", "discardpile", content);
  };

  render = () => {
    let content = null;
    switch (this.state.data.get("viewBy")) {
      case "region":
        content = this.renderByRegion();
        break;

      case "category":
        content = this.renderByCategory();
        break;

      case "byside":
        content = this.renderBySide();
        break;
      default:
        content = this.renderBySide();
        break;
    }

    const languages = this.languages.map(v => (
      <option key={v.id} value={v.id}>
        {v.name}
      </option>
    ));

    const viewOptions = this.views.map(v => (
      <option key={v} value={v}>
        {v}
      </option>
    ));
    const sortOptions = this.sorts.map(v => (
      <option key={v} value={v}>
        {v}
      </option>
    ));
    const filterOptions = this.filters.map(v => (
      <option key={v} value={v}>
        {v}
      </option>
    ));

    const yourhand = this.cards()
      .filter((_c: ImmutableCard, k: string) => this.state.data.getIn(["cardStates", k, "presence"]) === "inhand")
      .map((c: ImmutableCard, k: string) => this.renderCard(k, c))
      .toList();

    const ophand = this.cards()
      .filter((_c: ImmutableCard, k: string) => this.state.data.getIn(["cardStates", k, "presence"]) === "ophand")
      .map((c: ImmutableCard, k: string) => this.renderCard(k, c))
      .toList();

    const language = this.language()

    return (
      <div className="App">
        <div className="buttons">
          <div>
            <label id="savebutton" htmlFor="myfile" >Load Game</label>

            <input onChange={(event) => {
              const files = event.target.files;
              if (files) Load.load(files, (js: unknown) => this.appSaveState(() => fromJS(js) as AppData));
            }} className="hidden" id="myfile" name="files[]" type="file"/>

            <label id="loadbutton" htmlFor="save" onClick={() => Download.download(this.state.data.update("lastState", () => null))}>Save Game</label>

            <button onClick={() => this.reset()}>reset</button>
            <button title="Note: cards in deck will be moved to opponent's hand" onClick={() => this.addDiscards()}>
              readd discards
            </button>
            <button className={this.nextPhaseVisibility() ? "" : "hidden"} onClick={() => this.changePhase()}>
              {this.nextPhaseLabel()}
            </button>

            {language === "en" &&
            <input
              id="shortnames"
              type="checkbox"
              checked={this.state.data.get("shortCardNames")}
              onChange={this.toggleCardNames}
            />}
            {language === "en"  &&
            <label
              htmlFor="shortnames"
            >short names</label>
            }
            <select value={this.state.data.get("language")} onChange={this.setLanguage}>
              {languages}
            </select>
          </div>

          <div>
            <label>
              view:
              <select value={this.state.data.get("viewBy")} onChange={this.setView}>
                {viewOptions}
              </select>
            </label>
            <label>
              sort:
              <select value={this.state.data.get("sortBy")} onChange={this.setSort}>
                {sortOptions}
              </select>
            </label>
            <label>
              filter:
              <select value={this.state.data.get("filterBy")} onChange={this.setFilter}>
                {filterOptions}
              </select>
            </label>
            <button disabled={!this.state.data.get("lastState")} onClick={this.undo}>
              undo
            </button>
          </div>
        </div>
        <div className={"arrow-warning" + (this.state.data.get("lastState") !== null ? "-hidden" : "")}>
          Note: You can click on the arrow to move cards to your opponent's hand!
        </div>

        <div className="bothhands">
          <div className="hand lefthand">
            <fieldset>
              <legend>Your Hand ({yourhand.count()})</legend>
              <ul>{yourhand}</ul>
            </fieldset>
          </div>
          <i
            className={"fas " + (this.state.data.get("ussrSelected") ? "fa-arrow-right" : "fa-arrow-left")}
            onClick={this.toggleUSSR}
          />
          <div
            className={["hand", "righthand"]
              .concat(this.state.data.get("ussrSelected") === "ussr" ? ["handselected"] : [])
              .join(" ")}
          >
            <fieldset>
              <legend>Opponent Hand ({ophand.count()})</legend>
              <ul>{ophand}</ul>
            </fieldset>
          </div>
        </div>
        <span>{content}</span>
        <div className="collapseedges">{this.renderDiscardRemoved()}</div>
      </div>
    );
  };
}

export default App;
