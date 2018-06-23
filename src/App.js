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

  shuffleOccurs = () => {
  }

  changePhase = () => 
    this.setState(({data}) => {
      return {data: data.update('phase', p => p < 3 ? p + 1 : 1).set('lastState', data)}
    })

  changeSort = () =>
    this.setState(({data}) => {
      return {data: data.update('sortBy', sb => {
        switch (sb) {
          case "ops": return "name"
          case "name": return "importance"
          case "importance": return "ops"
          default: return "ops"
        }
      })}
    })

  // sorts = ['ops', 'name', 'importance']

  changeFilter = () =>
    this.setState(({data}) => {
      return {data: data.update('filterBy', fb => {
        switch (fb) {
          case "none":         return "scoring"
          case "scoring":      return "highpriority"
          case "highpriority": return "2ops"
          case "2ops":         return "3ops"
          case "3ops":         return "4ops"
          case "4ops":         return "none"
          default:             return "none"
        }
      })}
    })


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


  dealRest = () => {
  }

  // TODO hide in late war
  nextPhase = () => {
    switch (this.state.data.get('phase')) {
      case 1: return "ADD MIDWAR"
      case 2: return "ADD LATE WAR"
      default: return "TODO"
    }
  }

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

    this.cardClicked = this.cardClicked.bind(this)

    this.allCards = Cards.cards()

    this.state = App.initialState(this.allCards)
  }

  cards = () => {
    return this.allCards.sortBy(c => {
      switch (this.state.data.get('sortBy')) {
        case 'none': return 0
        case 'ops': return c.get('ops') ? c.get('ops') : 0
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
    })
  }

  phase = () => this.state.data.get('phase')

  renderByWar() {

    // TODO dry...
    let early = this.cards().filter(c => c.get('early')).map(c =>
      <Card key={c.get('key')} id={c.get('key')} side={c.get('side')} ops={c.get('ops')} name={c.get('name')} presence={this.state.data.getIn(['cardStates',c.get('key'), 'presence'])} onClick={this.cardClicked}/>
    ).toList()

    let mid = this.phase() < 2 ? [] : this.cards().filter(c => c.get('mid')).map(c => {
      return <Card key={c.get('key')} id={c.get('key')} side={c.get('side')} ops={c.get('ops')} name={c.get('name')} presence={this.state.data.getIn(['cardStates',c.get('key'), 'presence'])} onClick={this.cardClicked}/>
    }).toList()

    let late = this.phase() < 3 ? [] : this.cards().filter(c => c.get('late')).map(c =>
      <Card key={c.get('key')} id={c.get('key')} side={c.get('side')} ops={c.get('ops')} name={c.get('name')} presence={this.state.data.getIn(['cardStates',c.get('key'), 'presence'])} onClick={this.cardClicked}/>
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
        <button onClick={() => this.changePhase()}>{this.nextPhase()}</button>
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
