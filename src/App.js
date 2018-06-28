import React, { Component } from "react";
import "./App.css";
import Cards from "./Cards.js";
import SessionStorage from "./SessionStorage.js";

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
        style={{color: this.props.color}}
        onClick={e => {
          e.stopPropagation();
          this.props.onToHand(this.props.id);
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
        {this.props.ops == null ? <i className="score fas fa-star-half-alt"/> : "\u00A0" + this.props.ops} {this.props.name}
      </li>
    );
  }
}

class App extends Component {
  appSaveState = f => this.setState(({ data }) => ({ data: SessionStorage.set(f(data)) }));

  changePhase = () => this.appSaveState(st => st.update("phase", p => (p < 3 ? p + 1 : 1)).set("lastState", st));

  toggleDiscards = () => this.appSaveState(st => st.update("showDiscards", d => !d));

  toggleUSSR = () =>
    this.appSaveState(st => st.update("ussrSelected", oldside => (oldside !== "ussr" ? "ussr" : null)));

  setSort = event => {
    const ns = event.target.value;
    this.appSaveState(st => st.set("sortBy", ns));
  };

  setFilter = event => {
    const nf = event.target.value;
    this.appSaveState(st => st.set("filterBy", nf));
  };

  setView = event => {
    const nv = event.target.value;
    this.appSaveState(st => st.set("viewBy", nv));
  };

  reset = () =>
    this.appSaveState(st =>
      App.initialState(this.allCards)
        .set("sortBy", st.get("sortBy"))
        .set("filterBy", st.get("filterBy"))
        .set("viewBy", st.get("viewBy"))
        .set("ussrSelected", st.get("ussrSelected"))
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
              .set("ussrSelected", st.get("ussrSelected"))
    );

  /*  fix =  () => {
    this.appSaveState(st =>
      st.setIn(['cardStates', 'abm', 'presence'], "deck")
    )
    console.log(this.state.data.getIn(['cardStates','abm']).toJS())
  } */

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

  toHandCard = card => this.moveCard(card, this.state.data.get("ussrSelected") === "ussr" ? "ophand" : "inhand");
  discardCard = card => this.moveCard(card, "discarded");
  removeCard = card => this.moveCard(card, "removed");

  moveCard = (card, to) => this.appSaveState(st => st.setIn(["cardStates", card, "presence"], to).set("lastState", st));

  cardClicked = card =>
    this.appSaveState(st => {
      st.updateIn(["cardStates", card, "presence"], presence => {
        const event = this.allCards.getIn([card, "event"]);
        switch (presence) {
          case "deck":
            return "inhand";
          case "inhand":
          case "ophand":
            return "discarded";
          case "discarded":
            return event ? "removed" : presence;
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
      viewBy: "byside", // war / importance / byside
      sortBy: "importance", // ops / name / importance
      filterBy: "none", // none / scoring / 2ops / 3ops / 4ops / high priority
      showDiscards: true,
      phase: 1, // 1 = early, 2 = mid, 3 = late
      ussrSelected: null,
      lastState: null
    });

  constructor(props) {
    super(props);

    this.storage = SessionStorage.storageAvailable("sessionStorage");

    this.sorts = ["name", "importance", "ops"];
    // TODO filter by affects region
    this.filters = ["none", "mostimportant", "scoring", "nonscoring", "2ops", "3ops", "4ops"];
    this.views = ["region", "byside"];

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
    if (this.state.data.get("filterBy") === "mostimportant") {
      c = c.sortBy(c => Cards.cardRanking().size - c.get("importance")).take(15);
    }
    return c
      .sortBy(c => {
        switch (this.state.data.get("sortBy")) {
          case "none":
            return 0;
          case "ops":
            return c.get("ops") ? 5 - c.get("ops") : 0;
          case "name":
            return c.get("name");
          case "importance":
            return Cards.cardRanking().size - c.get("importance");

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
          case "2ops":
            return c.get("ops") >= 2;
          case "3ops":
            return c.get("ops") >= 3;
          case "4ops":
            return c.get("ops") >= 4;
          default:
            return true;
        }
      })
      .sortBy((c, k) => {
        let pres = this.state.data.getIn(["cardStates", k, "presence"]);
        return pres === "discarded" ? 1 : 0;
      });
  };

  renderCard = (k, c) =>
    (
      <Card
        key={k}
        id={k}
        side={c.get("side")}
        ops={c.get("ops")}
        event={c.get("event")}
        name={c.get("name")}
        color={this.cardColor(k)}
        onToHand={this.toHandCard}
        onDiscard={this.discardCard}
        onRemove={this.removeCard}
      />
    );

  renderByRegion() {
    const cards = this.cards();
    const f = cfilter =>
      cards
        .filter(cfilter)
        .filter((c, k) => {
          const pres = this.state.data.getIn(["cardStates", k, "presence"]);
          return pres !== "inhand" && pres !== "ophand";
        })
        .map((c, k) => this.renderCard(k, c))
        .toList();

    let early = f(c => c.get("early"));
    let mid = f(c => c.get("mid"));
    let late = f(c => c.get("late"));

    return (
      <div className="byregion">
        <div className="cardCol">
          <ul>{late}</ul>
        </div>
        <div className="cardCol">
          <ul>{mid}</ul>
        </div>
        <div className="cardCol">
          <ul>{early}</ul>
        </div>
      </div>
    );
  }

  renderBySide() {
    const cards = this.cards();
    const f = cfilter =>
      cards
        .filter(cfilter)
        .filter((c, k) => {
          const pres = this.state.data.getIn(["cardStates", k, "presence"]);
          return pres !== "inhand" && pres !== "ophand" && pres !== "discarded";
        })
        .map((c, k) => this.renderCard(k, c))
        .toList();

    let us = f(c => c.get("side") === "us");
    let neutral = f(c => c.get("side") === "neutral");
    let ussr = f(c => c.get("side") === "ussr");

    return (
      <div className="byside">
        <div className="cardCol">
          <fieldset>
            <legend align="center">us</legend>
            <ul>{us}</ul>
          </fieldset>
        </div>
        <div className="cardCol">
          <fieldset>
            <legend align="center">neutral</legend>
            <ul>{neutral}</ul>
          </fieldset>
        </div>
        <div className="cardCol">
          <fieldset>
            <legend align="center">ussr</legend>
            <ul>{ussr}</ul>
          </fieldset>
        </div>
      </div>
    );
  }

  renderDiscardRemoved = () => {

    const keep = (pres) => this.cards()
      .filter((c, k) => {
        return this.state.data.getIn(["cardStates", k, "presence"]) === pres;
      })
      .map((c, k) => this.renderCard(k, c))
      .toList();

    const discards = keep("discarded")
    const removes = keep("removed")

    return (
      <div className="discardpile">
        <div id="discarded" className="cardCol">
          <fieldset>
            <legend align="center">discard</legend>
            <ul>{discards}</ul>
          </fieldset>
        </div>
        <div id="removed" className="cardCol">
          <fieldset>
            <legend align="center">removed</legend>
            <ul>{removes}</ul>
          </fieldset>
        </div>
      </div>
    );
  };

  render() {
    let content = null;
    switch (this.state.data.get("viewBy")) {
      case "region":
        content = this.renderByRegion();
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
        <div className={["buttons"].join(" ")}>
          <button onClick={() => this.reset()}>reset</button>
          <button onClick={() => this.addDiscards()}>readd discards</button>
          <button className={this.nextPhaseVisibility() ? [] : ["hidden"]} onClick={() => this.changePhase()}>
            {this.nextPhaseLabel()}
          </button>
        </div>

        <div className={["buttons"].join(" ")}>
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
          {/* <label>
            show discarded<input type="checkbox" onChange={this.toggleDiscards} />
          </label> */}
        </div>
        <div className="bothhands">
          <div className="hand lefthand" onClick={this.toggleUSSR}>
            <fieldset>
              <legend>Your Hand ({yourhand.count()})</legend>
              <ul>{yourhand}</ul>
            </fieldset>
          </div>
          <div
            className={["hand", "righthand"]
              .concat(this.state.data.get("ussrSelected") === "ussr" ? ["handselected"] : [])
              .join(" ")}
            onClick={this.toggleUSSR}
          >
            <fieldset>
              <legend>Opponent Hand ({ophand.count()})</legend>
              <ul>{ophand}</ul>
            </fieldset>
          </div>
        </div>

        {content}
        <div>{this.renderDiscardRemoved()}</div>
        {/*<div>
      {JSON.stringify(this.state.data.get('cardStates'))}
        </div>*/}
      </div>
    );
  }
}

export default App;
