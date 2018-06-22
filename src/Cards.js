const { Map, List } = require('immutable')

class Cards {
  constructor() {

    this.cards = Map({
      ra:  Map({name: "roman abdication",        early: true, event: true,  side: "ussr",    ops: 1}),  
      ir:  Map({name: "independent reds",        early: true, event: true,  side: "ussr",    ops: 2}), 
      og:  Map({name: "olympic games",           early: true, event: true,  side: "neutral", ops: 2}), 
      as:  Map({name: "asia scoring",            early: true, event: false, side: "neutral",           scoringcard: true}),
      rsp: Map({name: "redscare / purge",        early: true, event: false, side: "neutral", ops: 4}),
      br:  Map({name: "brush war",               mid:   true, event: false, side: "neutral", ops: 2}), 
      sea: Map({name: "southeast asia scoring",  mid:   true, event: false, side: "neutral",           scoringcard: true}),
      wb:  Map({name: "willy brandt",            mid:   true, event: true,  side: "ussr",    ops: 2}), 
      dc:  Map({name: "duck and cover",          early: true, event: false, side: "us",      ops: 3}), 
      ys:  Map({name: "yuri & samantha",         late:  true, event: true,  side: "ussr",    ops: 2}), 
    })

    // console.log(this.cards.filter(x => { console.log(x.toJS()); return true}).toJS())

    this.ussr().mapKeys((k,v) => console.log(k))
  }


  earlywar = () => this.cards.filter(c => c.get('early'))
  midwar = () => this.cards.filter(c => c.get('mid'))
  latewar = () => this.cards.filter(c => c.get('late'))

  ussr = () => this.cards.filter(c => c.get('side') === 'ussr')
  us = () => this.cards.filter(c => c.get('side') === 'us')

}
export default Cards
