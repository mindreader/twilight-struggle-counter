import React, { Component } from "react";
import "./App.css";
import Cards from "./Cards.js";
import SessionStorage from "./SessionStorage.js"

const { Map, fromJS } = require("immutable");

// TODO add an inhand section
// TODO upon readding add an in opponents hand section
// TODO record cards tossed on before add midwar ?

class Card extends Component {
  attrs() {
    return {
      color: this.props.color,
      display: this.props.hidden ? "none" : "block"
    };
  }

  render() {
    // TODO get rid of style attribute
    return (
      <li className="card" style={this.attrs()} onClick={() => this.props.onToHand(this.props.id)}>
        <i
          className={["remove fas fa-ban"].concat(this.props.event ? [] : ["hidden"]).join(" ")}
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

        {this.props.ops == null ? "\u00A0\u00A0" : this.props.ops} {this.props.name}
      </li>
    );
  }
}

class App extends Component {

  appSaveState = (f) => this.setState(st => SessionStorage.set(f(st)))

  changePhase = () =>
    this.appSaveState(({ data }) => ({
      data: data.update("phase", p => (p < 3 ? p + 1 : 1)).set("lastState", data)
    }));

  toggleDiscards = () =>
    this.appSaveState(({ data }) => ({
      data: data.update("showDiscards", d => !d)
    }));

  setSort = event => {
    const ns = event.target.value;
    this.appSaveState(({ data }) => ({
      data: data.set("sortBy", ns)
    }));
  };

  setFilter = event => {
    const nf = event.target.value;
    this.appSaveState(({ data }) => ({
      data: data.set("filterBy", nf)
    }));
  };

  setView = event => {
    const nv = event.target.value;
    this.appSaveState(({ data }) => ({
      data: data.set("viewBy", nv)
    }));
  };

  reset = () =>
    this.appSaveState(({ data }) => ({
      data: App.initialState(this.allCards)
        .set("sortBy", data.get("sortBy"))
        .set("filterBy", data.get("filterBy"))
        .set("viewBy", data.get("viewBy"))
    }));

  undo = () =>
    this.appSaveState(({ data }) => {
      return {
        data: !data.get("lastState")
          ? data
          : data
              .get("lastState")
              .set("sortBy", data.get("sortBy"))
              .set("filterBy", data.get("filterBy"))
              .set("viewBy", data.get("viewBy"))
      };
    });

  addDiscards = () => {
    this.appSaveState(({ data }) => {
      return {
        data: data
          .set(
            "cardStates",
            data.get("cardStates").map(c => c.update("presence", presence => (presence === "discarded" ? "deck" : presence)))
          )
          .set("lastState", data)
      };
    });
  };


  toHandCard = card => this.moveCard(card, "inhand")
  discardCard= card => this.moveCard(card, "discarded")
  removeCard = card => this.moveCard(card, "removed")

  moveCard = (card,to) =>
    this.appSaveState(({ data }) => ({
      data: data.setIn(["cardStates", card, "presence"], to).set("lastState", data)
    }));


  cardClicked(card) {
    this.appSaveState(({ data }) => {
      return {
        data: data
          .updateIn(["cardStates", card, "presence"], presence => {
            const event = this.allCards.getIn([card, "event"]);
            switch (presence) {
              case "deck":
                return "inhand";
              case "inhand":
                return "discarded";
              case "discarded":
                return event ? "removed" : presence;
              default:
                return presence;
            }
          })
          .set("lastState", data)
      };
    });
  }

  nextPhaseVisibility = () => this.state.data.get("phase") !== 3;

  cardColor(card) {
//    console.log(this.state.data.getIn(['cardStates']))
    switch (this.state.data.getIn(["cardStates", card, "presence"])) {
      case "inhand":
        return "black";
      case "discarded":
        return "gray";
      case "deck":
        return this.allCards.getIn([card, "side"]) === "ussr" ? "red" : this.allCards.getIn([card, "side"]) === "us" ? "blue" : "purple";
      case "removed":
        return "black";
      default:
        return "black";
    }
  }

  // TODO hide in late war
  nextPhaseLabel = () => {
    switch (this.state.data.get("phase")) {
      case 1:
        return "add mid war";
      case 2:
        return "add late war";
      default:
        return "TODO";
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
      lastState: null
    });

  constructor(props) {
    super(props);

    this.storage = SessionStorage.storageAvailable("sessionStorage")

    this.sorts = ["name", "importance", "ops"];
    // TODO filter by affects region
    this.filters = ["none", "mostimportant", "scoring", "nonscoring", "2ops", "3ops", "4ops"];
    this.views = ["war", "byside"];

    this.allCards = Cards.cardsWithImportance();

    this.cardClicked = this.cardClicked.bind(this);


    this.state = { data: this.storage && SessionStorage.has() ? fromJS(SessionStorage.get()) : App.initialState(this.allCards) };
  }

  cards = () => {
    let c = this.allCards.filter(
      c =>
        this.state.data.get("phase") >= 3 ||
        (this.state.data.get("phase") >= 2 && !c.get("late")) ||
        (this.state.data.get("phase") === 1 && c.get("early"))
    );
    if (this.state.data.get("filterBy") === "mostimportant") {
      c = c.sortBy(c => Cards.cardRanking().size - c.get("importance")).take(15);
    }
    return c.sortBy(c => {
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
        return pres === "inhand" ? 2 : pres === "discarded" ? 1 : 0;
      });
  };

  phase = () => this.state.data.get("phase");

  renderCard = (k, c) => (
    <Card
      key={k}
      id={k}
      side={c.get("side")}
      ops={c.get("ops")}
      event={c.get("event")}
      name={c.get("name")}
      color={this.cardColor(k)}
      hidden={this.state.data.getIn(["cardStates", k, "presence"]) === "removed"}
      onToHand={this.toHandCard}
      onDiscard={this.discardCard}
      onRemove={this.removeCard}
    />
  );

  renderByWar() {
    const cards = this.cards();
    const f = cfilter =>
      cards
        .filter(cfilter)
        .map((c, k) => this.renderCard(k, c))
        .toList();

    let early = f(c => c.get("early"));
    let mid = f(c => c.get("mid"));
    let late = f(c => c.get("late"));

    return (
      <div className="bywar">
        <div className={["left", "cardCol"].join(" ")}>
          <ul>{late}</ul>
        </div>
        <div className={["middle", "cardCol"].join(" ")}>
          <ul>{mid}</ul>
        </div>
        <div className={["right", "cardCol"].join(" ")}>
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
        .map((c, k) => this.renderCard(k, c))
        .toList();

    let us = f(c => c.get("side") === "us");
    let neutral = f(c => c.get("side") === "neutral");
    let ussr = f(c => c.get("side") === "ussr");

    return (
      <div className="byside">
        <div className={["left", "cardCol"].join(" ")}>
          <ul>{us}</ul>
        </div>
        <div className={["middle", "cardCol"].join(" ")}>
          <ul>{neutral}</ul>
        </div>
        <div className={["right", "cardCol"].join(" ")}>
          <ul>{ussr}</ul>
        </div>
      </div>
    );
  }

  render() {
    let content = null;
    switch (this.state.data.get("viewBy")) {
      case "war":
        content = this.renderByWar();
        break;
      case "byside":
        content = this.renderBySide();
        break;
      default:
        content = this.renderByWar();
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

    return (
      <div className="App">
        <div className={["center", "buttons"].join(" ")}>
          <button onClick={() => this.reset()}>reset</button>
          <button onClick={() => this.addDiscards()}>readd discards</button>
          <button className={this.nextPhaseVisibility() ? [] : ["hidden"]} onClick={() => this.changePhase()}>
            {this.nextPhaseLabel()}
          </button>
        </div>
        <div className={["center", "buttons"].join(" ")}>
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
          <button disabled={!this.state.data.get("lastState")} onClick={() => this.undo()}>
            undo
          </button>
          <label>
            show discarded<input type="checkbox" onChange={this.toggleDiscards} />
          </label>
        </div>
        {content}
      </div>
    );
  }
}

export default App;
