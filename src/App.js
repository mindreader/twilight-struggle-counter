import React, { Component } from "react";
import "./App.css";
import Cards from "./Cards.js";
import SessionStorage from "./SessionStorage.js";
import { detect } from "detect-browser";

const { Map, fromJS } = require("immutable");

// TODO limit undo history to a certain number of steps (30?)
// game log?
// view byregion
// card count

class Card extends Component {
  render = () => {
    return (
      <li
        className="card"
        style={{ color: this.props.color }}
        onClick={e => {
          e.stopPropagation();
          this.props.onNameClick(this.props.id);
        }}
      >
        <i
          className={"remove fas fa-ban" + (this.props.event ? "" : " hidden")}
          onClick={e => {
            e.stopPropagation();
            this.props.onRemove(this.props.id);
          }}
        />
        <i
          className="discard fas fa-arrow-circle-down"
          onClick={e => {
            e.stopPropagation();
            this.props.onDiscard(this.props.id);
          }}
        />
        {this.props.ops == null ? <i className="score fas fa-star-half-alt" /> : "\u00A0" + this.props.ops}{" "}
        {this.props.name}
      </li>
    );
  };
}

// wish immutable would just export this.
const defaultComparator = (a, b) => (a > b ? 1 : a < b ? -1 : 0);

class App extends Component {
  appSaveState = f => this.setState(({ data }) => ({ data: SessionStorage.set(f(data)) }));
  appNoSaveState = f => this.setState(({ data }) => ({ data: f(data) }));

  changePhase = () => this.appSaveState(st => st.update("phase", p => (p < 3 ? p + 1 : 1)).set("lastState", st));

  toggleCardNames = () => this.appNoSaveState(st => st.update("shortCardNames", old => !old));

  toggleUSSR = () =>
    this.appNoSaveState(st => st.update("ussrSelected", oldside => (oldside !== "ussr" ? "ussr" : null)));

  setSort = event => {
    const ns = event.target.value;
    this.appNoSaveState(st => st.set("sortBy", ns));
  };

  setFilter = event => {
    const nf = event.target.value;
    this.appNoSaveState(st => st.set("filterBy", nf));
  };

  setView = event => {
    const nv = event.target.value;
    this.appNoSaveState(st => st.set("viewBy", nv));
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
        .update("cardStates", cs =>
          cs.map((c, k) =>
            c.update(
              "presence",
              presence =>
                presence === "discarded"
                  ? "deck"
                  : presence === "deck" && this.phaseFilter(this.allCards.get(k))
                    ? "ophand"
                    : presence
            )
          )
        )
        .set("lastState", st)
    );
  };

  onNameClick = card => {
    const hand = this.state.data.get("ussrSelected") === "ussr" ? "ophand" : "inhand";
    const pres = this.state.data.getIn(["cardStates", card, "presence"]);
    return this.moveCard(card, pres === "deck" ? hand : "deck");
  };
  discardCard = card => this.moveCard(card, "discarded");
  removeCard = card => this.moveCard(card, "removed");

  moveCard = (card, to) => this.appSaveState(st => st.setIn(["cardStates", card, "presence"], to).set("lastState", st));

  cardClicked = card =>
    this.appSaveState(st => {
      st.updateIn(["cardStates", card, "presence"], presence => {
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

  cardColor(card) {
    switch (this.state.data.getIn(["cardStates", card, "presence"])) {
      case "discarded":
      case "deck":
      case "inhand":
      case "ophand":
      case "removed":
        return this.allCards.getIn([card, "side"]) === "ussr"
          ? "red"
          : this.allCards.getIn([card, "side"]) === "us"
            ? "blue"
            : "purple";
      default:
        return "black";
    }
  }

  deckContainer = (legend, cl, content) => {
    // Firefox can style fieldsets with flex display.  Looks great, but unfortunately nothing else can.
    if (this.browser.name === "firefox")
      return (
        <fieldset className={cl}>
          <legend align="center">{legend}</legend>
          {content}
        </fieldset>
      );
    else return <div className={cl}>{content}</div>;
  };

  nextPhaseLabel = () => {
    switch (this.state.data.get("phase")) {
      case 1:
        return "add mid war";
      default:
        return "add late war";
    }
  };

  static initialState = allCards =>
    Map({
      cardStates: allCards.map(c => Map({ presence: "deck" })),
      viewBy: "byside",
      sortBy: "importance",
      filterBy: "all",
      showDiscards: true,
      phase: 1, // 1 = early, 2 = mid, 3 = late
      ussrSelected: null,
      shortCardNames: false,
      lastState: null
    });

  constructor(props) {
    super(props);

    this.browser = detect();
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

    this.allCards = Cards.cards();

    this.cardClicked = this.cardClicked.bind(this);

    this.state = {
      data: this.storage && SessionStorage.has() ? fromJS(SessionStorage.get()) : App.initialState(this.allCards)
    };
  }

  phaseFilter = card => {
    const phase = this.state.data.get("phase");
    return phase >= 3 || (phase >= 2 && !card.get("late")) || (phase === 1 && card.get("early"));
  };

  cards = () => {
    let c = this.allCards.filter(c => this.phaseFilter(c));
    // TODO filter by most important that are not "gone"
    if (this.state.data.get("filterBy") === "most important 15") {
      c = c
        .filter((c, k) => {
          const pres = this.state.data.getIn(["cardStates", k, "presence"]);
          return pres !== "removed" && pres !== "discarded" && pres !== "inhand" && pres !== "gone";
        })
        .sortBy(c => Cards.cardRanking().size - c.get("importance"))
        .take(15);
    }
    return c
      .sort((c1, c2) => {
        switch (this.state.data.get("sortBy")) {
          case "all":
            return 0;
          case "ops":
            return defaultComparator(c2.get("ops"), c1.get("ops"));
          case "name":
            return defaultComparator(c1.get("name").toLowerCase(), c2.get("name").toLowerCase());
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
            return defaultComparator(c1.get("name").toLowerCase(), c2.get("name").toLowerCase());
          default:
            return c.get("name");
        }
      })
      .filter(c => {
        switch (this.state.data.get("filterBy")) {
          case "scoring":
            return c.get("scoringcard");
          case "nonscoring":
            return !c.get("scoringcard");
          case "2ops+":
            return c.get("ops") >= 2;
          case "3ops+":
            return c.get("ops") >= 3;
          case "4ops+":
            return c.get("ops") >= 4;
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
      .sortBy((c, k) => {
        let pres = this.state.data.getIn(["cardStates", k, "presence"]);
        return pres === "discarded" ? 1 : 0;
      });
  };

  renderCard = (k, c) => (
    <Card
      key={k}
      id={k}
      side={c.get("side")}
      ops={c.get("ops")}
      event={c.get("event")}
      name={this.state.data.get("shortCardNames") ? k : c.get("name")}
      color={this.cardColor(k)}
      onNameClick={this.onNameClick}
      onDiscard={this.discardCard}
      onRemove={this.removeCard}
    />
  );

  renderByCategory() {
    // TODO this and top of renderByRegion are complete copy paste
    const cards = this.cards();
    const regInfo = Cards.cardRegions(
      this.state.data
        .get("cardStates")
        .filter(c => c.get("presence") === "removed")
        .keySeq()
        .toSet(),
      this.state.data
        .get("cardStates")
        .filter(
          (c, k) =>
            c.get("presence") === "discarded" &&
            this.allCards.getIn([k, "side"]) !== "ussr" &&
            !this.allCards.getIn([k, "scoringcard"])
        )
        .keySeq()
        .toSet(),
      this.state.data.get("phase")
    );

    const f = category =>
      cards
        .filter((c, k) => regInfo.get(category).has(k))
        .filter((c, k) => {
          const pres = this.state.data.getIn(["cardStates", k, "presence"]);
          return pres === "deck";
        })
        .map((c, k) => this.renderCard(k, c))
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
          <legend align="center">{cat}</legend>
          <ul>{data}</ul>
        </fieldset>
      )
    );
    return <div className="collapseedges">{this.deckContainer("deck", "bycategory", content)}</div>;
  }

  renderByRegion() {
    const cards = this.cards();
    const regInfo = Cards.cardRegions(
      this.state.data
        .get("cardStates")
        .filter(c => c.get("presence") === "removed")
        .keySeq()
        .toSet(),
      this.state.data
        .get("cardStates")
        .filter(
          (c, k) =>
            c.get("presence") === "discarded" &&
            this.allCards.getIn([k, "side"]) !== "ussr" &&
            !this.allCards.getIn([k, "scoringcard"])
        )
        .keySeq()
        .toSet(),
      this.state.data.get("phase")
    );

    const f = region =>
      cards
        .filter((c, k) => regInfo.get(region).has(k) || regInfo.get("all").has(k))
        .filter((c, k) => {
          const pres = this.state.data.getIn(["cardStates", k, "presence"]);
          return pres === "deck";
        })
        .map((c, k) => this.renderCard(k, c))
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
        <legend align="center">{region}</legend>
        <ul>{data}</ul>
      </fieldset>
    ));

    return <div className="collapseedges">{this.deckContainer("deck", "byregion", content)}</div>;
  }

  renderBySide() {
    const cards = this.cards();
    const f = side =>
      cards
        .filter(c => c.get("side") === side)
        .filter((c, k) => {
          const pres = this.state.data.getIn(["cardStates", k, "presence"]);
          return pres !== "inhand" && pres !== "ophand" && pres !== "discarded" && pres !== "removed";
        })
        .map((c, k) => this.renderCard(k, c))
        .toList();

    const us = { side: "us", data: f("us") };
    const neutral = { side: "neutral", data: f("neutral") };
    const ussr = { side: "ussr", data: f("ussr") };

    const content = [us, neutral, ussr].map(({ side, data }) => (
      <div key={side} className="cardCol">
        <fieldset>
          <legend align="center">{side}</legend>
          <ul>{data}</ul>
        </fieldset>
      </div>
    ));

    return <div className="collapseedges">{this.deckContainer("deck", "byside", content)}</div>;
  }

  renderDiscardRemoved = () => {
    const keep = pres =>
      this.cards()
        .filter((c, k) => {
          return this.state.data.getIn(["cardStates", k, "presence"]) === pres;
        })
        .map((c, k) => this.renderCard(k, c))
        .toList();

    const discards = keep("discarded");
    const removes = keep("removed");

    const content = [{ name: "removed", data: removes }, { name: "discarded", data: discards }].map(c => (
      <div key={c.name} id={c.name} className="cardCol">
        <fieldset>
          <legend align="center">{c.name}</legend>
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
      .filter((c, k) => this.state.data.getIn(["cardStates", k, "presence"]) === "inhand")
      .map((c, k) => this.renderCard(k, c))
      .toList();

    const ophand = this.cards()
      .filter((c, k) => this.state.data.getIn(["cardStates", k, "presence"]) === "ophand")
      .map((c, k) => this.renderCard(k, c))
      .toList();

    return (
      <div className="App">
        <div className="buttons">
          <div>
            <button onClick={() => this.reset()}>reset</button>
            <button title="Note: cards in deck will be moved to opponent's hand" onClick={() => this.addDiscards()}>
              readd discards
            </button>
            <button className={this.nextPhaseVisibility() ? [] : ["hidden"]} onClick={() => this.changePhase()}>
              {this.nextPhaseLabel()}
            </button>
            <input
              id="shortnames"
              type="checkbox"
              checked={this.state.data.get("shortCardNames")}
              onChange={this.toggleCardNames}
            />
            <label htmlFor="shortnames">short names</label>
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
        {/*<div>
      {JSON.stringify(this.state.data.get('cardStates'))}
        </div>*/}
      </div>
    );
  };
}

export default App;
