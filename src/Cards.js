const { Map } = require('immutable')

class Cards {
  static cards = () =>
    Map({
      ra:  Map({key: 'ra',  name: "roman abdication",        early: true, event: true,  side: "ussr",    ops: 1}),  
      ir:  Map({key: 'ir',  name: "independent reds",        early: true, event: true,  side: "ussr",    ops: 2}), 
      og:  Map({key: 'og',  name: "olympic games",           early: true, event: true,  side: "neutral", ops: 2}), 
      as:  Map({key: 'as',  name: "asia scoring",            early: true, event: false, side: "neutral",           scoringcard: true}),
      rsp: Map({key: 'rsp', name: "redscare / purge",       early: true, event: false, side: "neutral", ops: 4}),
      br:  Map({key: 'br',  name: "brush war",               mid:   true, event: false, side: "neutral", ops: 2}), 
      sea: Map({key: 'sea', name: "southeast asia scoring", mid:   true, event: true,  side: "neutral",           scoringcard: true}),
      wb:  Map({key: 'wb',  name: "willy brandt",            mid:   true, event: true,  side: "ussr",    ops: 2}), 
      dc:  Map({key: 'dc',  name: "duck and cover",          early: true, event: false, side: "us",      ops: 3}), 
      ys:  Map({key: 'ys',  name: "yuri & samantha",         late:  true, event: true,  side: "ussr",    ops: 2}), 
    })

  static cardsWithImportance = () =>
    Cards.cards().map(c => {
      switch (c.get('key')) {
        case 'ra':
        case 'ir':
        case 'og':
        case 'ys':
          return c.set('importance', 1)
        case 'wb':

          return c.set('importance', 2)
        case 'dc':
        case 'sea':

          return c.set('importance', 3)

        case 'as':
        case 'rsp':
        case 'br':
          return c.set('importance', 4)

        default:
          return c.set('importance', 0)
      }
    })

}
export default Cards
