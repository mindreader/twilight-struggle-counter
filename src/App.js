import React, { Component } from 'react';
import './App.css';
import Cards from './Cards.js';
const { Map } = require('immutable')



class Card extends Component {
  color() {
    switch (this.props.presence) {
      case "deck": return "black"
      case "discarded": return "gray"
      case "inhand": return (this.props.side === "ussr") ? "red" : (this.props.side === "us" ? "blue" : "black")
      case "removed": return "black"
      default: return "black"
    }
  }

  hidden() {
    return this.props.presence === 'removed'
  }
  attrs() {
    return {color: this.color(), display: this.hidden() ? "none" : "block"}
  }

  render() {
    return <li style={this.attrs()} onClick={() => this.props.onClicked(this.prop.key)} >{this.props.ops} {this.props.name}</li>
  }
}

class App extends Component {

  shuffleOccurs = () => {
  }
  changePhase = (prev) => {
    this.setState({phase: prev.phase + 1})
  }

  reset = (prev) => {
    this.setState({
      cardStates: this.allCards.map(c => Map({presence: "deck"})),
      phase: 1,
    })
  }

  dealRest = () => {
  }

  // TODO hide in late war
  nextPhase = () => {
    if (this.state.phase === 1) return "ADD MIDWAR"
    else if (this.state.phase === 2) return "ADD LATE WAR"
    else return "TODO"
  }

  redeal(card) {
//    if (this.props.presence != 'removed' && this.state.presence != 'inhand') {
//      this.state.presence = 'deck';
//    }
  }

  cardClicked(card) {
    console.log("clicked!")
    console.log(card)
//    if (this.state.presence == 'inhand') {
//      this.setState({
//        presence: 'discarded'
//      })
//    }
//    else if (this.state.presence == 'discarded' && this.props.card.event) {
//      this.setState({
//        presence: 'removed'
//      })
//    }
  }



  constructor(props) {
    super(props)

    this.allCards = Cards.cards()

    this.state = {
      cardStates: this.allCards.map(c => Map({presence: "inhand"})),
      sortBy: 'war', // war / ops value / importance
      filter: 'scoring', // scoring / most important / highest ops 
      phase: 1, // 1 = early, 2 = mid, 3 = late
    }
  }

  renderByWar() {

    // TODO dry...
    let early = Cards.earlywar(this.allCards).map(c =>
      <Card key={c.get('key')} side={c.get('side')} ops={c.get('ops')} name={c.get('name')} presence={this.state.cardStates.get(c.get('key')).get('presence')} onClick={this.cardClicked}/>
    ).toList()

    let mid = Cards.midwar(this.allCards).map(c =>
      <Card key={c.get('key')} side={c.get('side')} ops={c.get('ops')} name={c.get('name')} presence={this.state.cardStates.get(c.get('key')).get('presence')} onClick={this.cardClicked}/>
    ).toList()

    let late = Cards.latewar(this.allCards).map(c =>
      <Card key={c.get('key')} side={c.get('side')} ops={c.get('ops')} name={c.get('name')} presence={this.state.cardStates.get(c.get('key')).get('presence')} onClick={this.cardClicked}/>
    ).toList()

   return (
      <div>
        <div>
          <ul>
            {early}
          </ul>
        </div>
        <div>
          <ul>
            {mid}
          </ul>
        </div>
        <div>
          <ul>
            {late}
          </ul>
        </div>
      </div>
    );
  }

  renderByOps() {
  }

  renderByImportance() {
  }

  render() {
    let content = null
    switch (this.state.sortBy) {
      case 'war':        content = this.renderByWar()
        break;
      case 'ops':        content = this.renderByOps()
        break;
      case 'importance': content = this.renderByImportance()
        break;
      default:           content = this.renderByWar()
        break;
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcomen to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => this.addDiscards()}>ADD DISCARDS</button>
        <button onClick={() => this.changePhase()}>{this.nextPhase()}</button>
        <button onClick={() => this.reset()}>RESET</button>
        {content}
      </div>
    )
  }

//     let early = mapkeys((c,k) => {
//       return <card key={k} card={c} presence={this.state.cardstates[k].presence} onclick={() => this.cardclicked()}/>
//     }, this.cards.earlywar())
//
//     let mid = mapKeys((c,k) => {
//       return <Card key={k} card={c} presence={this.state.cardStates[k].presence} onClick={() => this.cardClicked()}/>
//     }, this.cards.earlywar())
//
//     let late = map((c,k) => {
//       return <Card key={k} card={c} presence={this.state.cardStates[k].presence} onClick={() => this.cardClicked()}/>
//     }, this.cards.earlywar())


}

export default App;
