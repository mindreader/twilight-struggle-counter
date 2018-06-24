import React, { Component } from 'react';
import './App.css';
import Cards from './Cards.js';
const { Map } = require('immutable')



class Card extends Component {
  color() {
    switch (this.props.presence) {
      case "deck": return "black"
      case "discarded": return "gray"
      case "inhand": return (this.props.side === "ussr") ? "red" : (this.props.side === "us" ? "blue" : "purple")
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
    // TODO get rid of style attribute
    return <li className="card" style={this.attrs()} onClick={() => this.props.onClick(this.props.id)} >{this.props.ops} {this.props.name}</li>
  }
}

class App extends Component {

  changePhase = () => this.setState(({data}) =>
    ({data: data.update('phase', p => p < 3 ? p + 1 : 1).set('lastState', data)}))

  changeSort = () => this.setState(({data}) =>
    ({data: data.update('sortBy', sb => this.sorts[sb])}))

  changeFilter = () => this.setState(({data}) =>
    ({data: data.update('filterBy', fb => this.filters[fb])}))

  changeView = () => this.setState(({data}) =>
    ({data: data.update('viewBy', vb => this.views[vb])}))

  reset = () => this.setState(() => App.initialState(this.allCards))

  undo = () =>
    this.setState(({data}) => {
      return {data: !data.get('lastState') ? data :
        data.get('lastState')
        .set('sortBy', data.get('sortBy'))
        .set('filterBy', data.get('filterBy'))
        .set('viewBy', data.get('viewBy'))
      }
    })


  addDiscards() {
    this.setState(({data}) => {
      return {
        data: data.set('cardStates', data.get('cardStates').map(c =>
          c.update('presence', presence => 
            presence === 'discarded' ? 'deck' : presence
          )
        )).set('lastState', data)
      }
    })
  }

  cardClicked(card) {
    // console.log(['card clicked', card])
    this.setState(({data}) => {
      return {
        data: data.updateIn(['cardStates', card, 'presence'], (presence) => {
          const event = this.allCards.getIn([card, 'event'])
          switch (presence) {
            case "deck":      return 'inhand'
            case "inhand":    return 'discarded'
            case "discarded": return (event ? "removed" : presence)
            default:          return presence
          }
        }).set('lastState', data)
      }
    })
  }

  // TODO hide in late war
  nextPhaseLabel = () => {
    switch (this.state.data.get('phase')) {
      case 1: return "ADD MIDWAR"
      case 2: return "ADD LATE WAR"
      default: return "TODO"
    }
  }



  static initialState = (allCards) => {
    return {data: Map({
      cardStates: allCards.map(c =>
        Map({presence: "deck"})
      ),
      viewBy: 'war', // war / ops value / importance
      sortBy: 'ops', // ops / name / importance
      filterBy: 'none', // none / scoring / 2ops / 3ops / 4ops / high priority
      phase: 1, // 1 = early, 2 = mid, 3 = late
      lastState: null,
    })}
  }

  constructor(props) {
    super(props)

    this.sorts = {ops: 'name', name: 'importance', importance: 'ops'}
    this.filters = {none: "scoring", scoring: "highpriority",
      highpriority: "2ops", "2ops": "3ops", "3ops": "4ops", "4ops": "none"}
    this.views = {war: "ops", ops: "importance", importance: "war"}

    this.allCards = Cards.cards()

    this.cardClicked = this.cardClicked.bind(this)

    this.state = App.initialState(this.allCards)
  }

  cards = () => {
    return this.allCards.sortBy(c => {
      switch (this.state.data.get('sortBy')) {
        case 'none': return 0
        case 'ops': return c.get('ops') ? (5 - c.get('ops')) : 0
        case 'name': return c.get('name')
        case 'importance': return 0 // TODO
        default: return c.get('name')
      }
    }).filter(c => {
      switch (this.state.data.get('filterBy')) {
        case 'scoring': return c.get('scoringcard')
        case '2ops': return c.get('ops') >= 2
        case '3ops': return c.get('ops') >= 3
        case '4ops': return c.get('ops') >= 4
        case 'highpriority': return true
        default: return true
      }
    }).filter(c =>
      this.state.data.get('phase') >= 3 || (this.state.data.get('phase') >= 2 && !c.get("late")) || (this.state.data.get('phase') === 1 && c.get("early"))
    )
  }

  phase = () => this.state.data.get('phase')

  renderByWar() {

    const cards = this.cards()
    const f = (cfilter) => cards.filter(cfilter).map(c =>
      <Card key={c.get('key')} id={c.get('key')} side={c.get('side')} ops={c.get('ops')} name={c.get('name')} presence={this.state.data.getIn(['cardStates',c.get('key'), 'presence'])} onClick={this.cardClicked}/>
    ).toList()

    let early = f(c => c.get('early'))
    let mid = f(c => c.get('mid'))
    let late = f(c => c.get('late'))

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
    )
  }

  renderByOps() {
    const cards = this.cards().map(c =>
      <Card key={c.get('key')} id={c.get('key')} side={c.get('side')} ops={c.get('ops')} name={c.get('name')} presence={this.state.data.getIn(['cardStates',c.get('key'), 'presence'])} onClick={this.cardClicked}/>
    ).toList()
    return (
      <div>
          <div>
            <ul>
              {cards}
            </ul>
          </div>
      </div>)
  }

  renderByImportance() {
  }

  render() {
    let content = null
    switch (this.state.data.get('viewBy')) {
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
        <button onClick={() => this.addDiscards()}>ADD DISCARDS</button>
        <button onClick={() => this.changePhase()}>{this.nextPhaseLabel()}</button>
        <button onClick={() => this.reset()}>RESET</button>
        <button onClick={() => this.undo()}>UNDO</button>
        <button onClick={() => this.changeView()}>viewed by {this.state.data.get('viewBy')}</button>
        <button onClick={() => this.changeSort()}>sorted by {this.state.data.get('sortBy')}</button>
        <button onClick={() => this.changeFilter()}>filtered by {this.state.data.get('filterBy')}</button>
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
