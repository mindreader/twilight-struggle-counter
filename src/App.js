import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Cards from './Cards.js';
import fp from 'lodash/fp'
const { Map } = require('immutable')



class Card extends Component {
  constructor(props) {
    super(props)

  }

  color() {
    switch (this.props.presence) {
      case "deck": return "black"
      case "discarded": return "gray"
      case "inhand": return "red"
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
    return <li style={this.attrs()} key={this.props.card.name} onClick={ () => this.clicked() } >{this.props.card.name}</li>
  }
}

class App extends Component {

  shuffleOccurs = () => {
  }
  addDiscards = () => {
  }

  redeal(card) {
//    if (this.props.presence != 'removed' && this.state.presence != 'inhand') {
//      this.state.presence = 'deck';
//    }
  }

  clicked(card) {
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

    this.cards = new Cards()

    let cardStates = Map()

    this.state = {
      cardStates: cardStates,
      sortBy: 'name', // name / ops value / importance
      filter: 'scoring', // scoring / most important / highest ops 
      midWarAdded: false,
      lateWarAdded: false,
    }
  }

  render() {

//     let early = fp.map(c => {
//       return <Card key={c.name} card={c}/>
//     }, this.cards.earlywar())
//
//     let mid = fp.map(c => {
//       return <Card key={c.name} card={c}/>
//     }, this.cards.midwar())
//
//     let late = fp.map(c => {
//       return <Card key={c.name} card={c}/>
//     }, this.cards.latewar())

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcomen to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => this.addDiscards()}>ADD DISCARDS</button>
        <div>
          <ul>
            {}
          </ul>
        </div>
        <div>
          <ul>
            {}
          </ul>
        </div>
        <div>
          <ul>
            {}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
