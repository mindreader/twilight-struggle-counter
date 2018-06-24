const { Map } = require('immutable')

class Cards {
  static cards = () =>
    Map({
      as:  Map({name: "asia scoring",            early: true, event: false, side: "neutral",           scoringcard: true}),
      eu:  Map({name: "europe scoring",            early: true, event: false, side: "neutral",           scoringcard: true}),
      mes:  Map({name: "middle east scoring",            early: true, event: false, side: "neutral",           scoringcard: true}),
      sea: Map({key: 'sea', name: "southeast asia scoring", mid:   true, event: true,  side: "neutral",           scoringcard: true}),
      ra:  Map({name: "roman abdication",        early: true, event: true,  side: "ussr",    ops: 1}),
      ir:  Map({name: "independent reds",        early: true, event: true,  side: "ussr",    ops: 2}),
      og:  Map({name: "olympic games",           early: true, event: true,  side: "neutral", ops: 2}),
      rsp: Map({key: 'rsp', name: "redscare / purge",       early: true, event: false, side: "neutral", ops: 4}),
      br:  Map({name: "brush war",               mid:   true, event: false, side: "neutral", ops: 2}),
      wb:  Map({name: "willy brandt",            mid:   true, event: true,  side: "ussr",    ops: 2}),
      dc:  Map({name: "duck and cover",          early: true, event: false, side: "us",      ops: 3}),
      fyp:  Map({name: "five year plan",          early: true, event: false, side: "us",      ops: 3}),
      sg:  Map({name: "socialist governments",          early: true, event: false, side: "ussr",      ops: 3}),
      ys:  Map({name: "yuri & samantha",         late:  true, event: true,  side: "ussr",    ops: 2}),
      fd:  Map({name: "fidel",         early:  true, event: true,  side: "ussr",    ops: 2}),
      vr:  Map({name: "vietnam revolts",         early:  true, event: true,  side: "ussr",    ops: 2}),
      bl:  Map({name: "blockade",         early:  true, event: true,  side: "ussr",    ops: 1}),
      kw:  Map({name: "korean war",         early:  true, event: true,  side: "ussr",    ops: 2}),
      aiw:  Map({name: "arab-israeli war",         early:  true, event: false,  side: "ussr",    ops: 2}),
      cm:  Map({name: "comecon",         early:  true, event: true,  side: "ussr",    ops: 3}),
      nsr:  Map({name: "nasser",         early:  true, event: true,  side: "ussr",    ops: 1}),
      wsp:  Map({name: "warsaw pact formed",         early:  true, event: true,  side: "ussr",    ops: 3}),
      dg:  Map({name: "degaulle leads france",         early:  true, event: true,  side: "ussr",    ops: 3}),
      cns:  Map({name: "captured nazi scientist",         early:  true, event: true,  side: "neutral",    ops: 2}),
      td:  Map({name: "truman doctrine",         early:  true, event: true,  side: "us",    ops: 1}),
      nt:  Map({name: "nato",         early:  true, event: true,  side: "us",    ops: 4}),
      mp:  Map({name: "marshall plan",         early:  true, event: true,  side: "us",    ops: 4}),
      ipw:  Map({name: "indo-pakistani war",         early:  true, event: false,  side: "neutral",    ops: 2}),
      cnt:  Map({name: "containment",         early:  true, event: true,  side: "us",    ops: 3}),
      cia:  Map({name: "cia created",         early:  true, event: true,  side: "us",    ops: 1}),
      suz:  Map({name: "suez crisis",         early:  true, event: true,  side: "ussr",    ops: 3}),
      eeu:  Map({name: "east european unrest",         early:  true, event: false,  side: "us",    ops: 3}),
      dcz:  Map({name: "decolonization",         early:  true, event: false,  side: "ussr",    ops: 2}),
      un:  Map({name: "un intervention",         early:  true, event: false,  side: "neutral",    ops: 1}),
      ntp:  Map({name: "nuclear test ban",         early:  true, event: false,  side: "neutral",    ops: 4}),
      fr:  Map({name: "formosan resolution",         early:  true, event: true,  side: "us",    ops: 2}),
      df:  Map({name: "defectors",         early:  true, event: false,  side: "us",    ops: 2}),
      cas:  Map({name: "central american scoring",         mid:  true, event: false,  side: "neutral",    scoringcard: true}),
      ar:  Map({name: "arms race",         mid:  true, event: false,  side: "neutral",    ops: 3}),
      cmc:  Map({name: "cuban missile crisis",         mid:  true, event: true,  side: "neutral",    ops: 3}),
      ns:  Map({name: "nuclear subs",         mid:  true, event: true,  side: "us",    ops: 2}),
      qm:  Map({name: "quagmire",         mid:  true, event: true,  side: "ussr",    ops: 3}),
      sn:  Map({name: "salt negotiations",         mid:  true, event: true,  side: "neutral",    ops: 3}),
      bt:  Map({name: "bear trap",         mid:  true, event: true,  side: "us",    ops: 3}),
      sm:  Map({name: "summit",         mid:  true, event: false,  side: "neutral",    ops: 1}),
      hil:  Map({name: "how i learned to stop worrying",         mid:  true, event: true,  side: "neutral",    ops: 2}),
      jun:  Map({name: "junta",         mid:  true, event: false,  side: "neutral",    ops: 2}),
      kd:  Map({name: "kitchen debates",         mid:  true, event: true,  side: "us",    ops: 1}),
      me:  Map({name: "missile envy",         mid:  true, event: false,  side: "neutral",    ops: 2}),
      wwb:  Map({name: "we will bury you",         mid:  true, event: true,  side: "ussr",    ops: 4}),
      bd:  Map({name: "brezhnev doctrine",         mid:  true, event: true,  side: "ussr",    ops: 3}),
      pec:  Map({name: "portuuese empire crumbles",         mid:  true, event: true,  side: "ussr",    ops: 2}),
      sau:  Map({name: "south african unrest",         mid:  true, event: false,  side: "ussr",    ops: 2}),
      all:  Map({name: "allende",         mid:  true, event: true,  side: "ussr",    ops: 1}),
      mus:  Map({name: "muslim revolution",         mid:  true, event: false,  side: "ussr",    ops: 4}),
      cr:  Map({name: "cultural revolution",         mid:  true, event: true,  side: "ussr",    ops: 3}),
      fp:  Map({name: "flower power",         mid:  true, event: true,  side: "ussr",    ops: 4}),
      u2:  Map({name: "U-2 incident",         mid:  true, event: true,  side: "ussr",    ops: 3}),
      opc:  Map({name: "opec",         mid:  true, event: false,  side: "ussr",    ops: 3}),
      lg:  Map({name: "lone gunman",         mid:  true, event: true,  side: "ussr",    ops: 1}),
      crg:  Map({name: "colonial rear guards",         mid:  true, event: false,  side: "us",    ops: 2}),
      pcr:  Map({name: "panama canal returned",         mid:  true, event: true,  side: "us",    ops: 1}),
      cda:  Map({name: "camp david accords",         mid:  true, event: true,  side: "us",    ops: 2}),
      pg:  Map({name: "puppet governments",         mid:  true, event: true,  side: "us",    ops: 2}),
      gs:  Map({name: "grain sales to soviets",         mid:  true, event: false,  side: "us",    ops: 2}),
      jp:  Map({name: "john paul II elected pope",         mid:  true, event: true,  side: "us",    ops: 2}),
      lds:  Map({name: "latin american death squads",         mid:  true, event: false,  side: "neutral",    ops: 2}),
      nix:  Map({name: "nixon plays the china card",         mid:  true, event: true,  side: "us",    ops: 2}),
      oas:  Map({name: "oas founded",         mid:  true, event: true,  side: "us",    ops: 1}),
      sad:  Map({name: "saddat expels soviets",         mid:  true, event: true,  side: "us",    ops: 1}),
      sd:  Map({name: "shuttle diplomacy",         mid:  true, event: true,  side: "us",    ops: 3}),
      voa:  Map({name: "voice of america",         mid:  true, event: false,  side: "us",    ops: 2}),
      lib:  Map({name: "liberation theology",         mid:  true, event: false,  side: "ussr",    ops: 2}),
      urs:  Map({name: "ussuri river skirmish",         mid:  true, event: true,  side: "us",    ops: 3}),
      an:  Map({name: "ask not what your country...",         mid:  true, event: true,  side: "us",    ops: 3}),
      ap:  Map({name: "alliance for progress",         mid:  true, event: true,  side: "us",    ops: 3}),
      afs:  Map({name: "african scoring",         mid:  true, event: false,  side: "neutral",    scoringcard: true}),
      one:  Map({name: "one small step",         mid:  true, event: false,  side: "neutral",    ops: 2}),
      sas:  Map({name: "south america scoring",         mid:  true, event: false,  side: "neutral",    scoringcard: true}),
      ihc:  Map({name: "iranian hostage crisis",         late:  true, event: true,  side: "ussr", ops: 3}),
    })

  static cardsWithImportance = () =>
    Cards.cards().map((c,k) => {
      switch (k) {
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
