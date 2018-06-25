const { Map, Seq } = require("immutable");

class Cards {
  static cards = () =>
    Map({
      japan: Map({
        name: "us / japan pact",
        early: true,
        event: true,
        side: "us",
        ops: 4
      }),
      asia: Map({
        name: "asia scoring",
        early: true,
        event: false,
        side: "neutral",
        scoringcard: true
      }),
      eu: Map({
        name: "europe scoring",
        early: true,
        event: false,
        side: "neutral",
        scoringcard: true
      }),
      mes: Map({
        name: "middle east scoring",
        early: true,
        event: false,
        side: "neutral",
        scoringcard: true
      }),
      sea: Map({
        key: "sea",
        name: "southeast asia scoring",
        mid: true,
        event: true,
        side: "neutral",
        scoringcard: true
      }),
      romabd: Map({
        name: "roman abdication",
        early: true,
        event: true,
        side: "ussr",
        ops: 1
      }),
      ireds: Map({
        name: "independent reds",
        early: true,
        event: true,
        side: "ussr",
        ops: 2
      }),
      olymp: Map({
        name: "olympic games",
        early: true,
        event: false,
        side: "neutral",
        ops: 2
      }),
      rsp: Map({
        key: "rsp",
        name: "redscare / purge",
        early: true,
        event: false,
        side: "neutral",
        ops: 4
      }),
      bw: Map({
        name: "brush war",
        mid: true,
        event: false,
        side: "neutral",
        ops: 2
      }),
      willy: Map({
        name: "willy brandt",
        mid: true,
        event: true,
        side: "ussr",
        ops: 2
      }),
      "d&c": Map({
        name: "duck and cover",
        early: true,
        event: false,
        side: "us",
        ops: 3
      }),
      fyp: Map({
        name: "five year plan",
        early: true,
        event: false,
        side: "us",
        ops: 3
      }),
      socgov: Map({
        name: "socialist governments",
        early: true,
        event: false,
        side: "ussr",
        ops: 3
      }),
      yuri: Map({
        name: "yuri & samantha",
        late: true,
        event: true,
        side: "ussr",
        ops: 2
      }),
      fidel: Map({
        name: "fidel",
        early: true,
        event: true,
        side: "ussr",
        ops: 2
      }),
      viet: Map({
        name: "vietnam revolts",
        early: true,
        event: true,
        side: "ussr",
        ops: 2
      }),
      block: Map({
        name: "blockade",
        early: true,
        event: true,
        side: "ussr",
        ops: 1
      }),
      korw: Map({
        name: "korean war",
        early: true,
        event: true,
        side: "ussr",
        ops: 2
      }),
      arisw: Map({
        name: "arab-israeli war",
        early: true,
        event: false,
        side: "ussr",
        ops: 2
      }),
      come: Map({
        name: "comecon",
        early: true,
        event: true,
        side: "ussr",
        ops: 3
      }),
      nass: Map({
        name: "nasser",
        early: true,
        event: true,
        side: "ussr",
        ops: 1
      }),
      warsaw: Map({
        name: "warsaw pact formed",
        early: true,
        event: true,
        side: "ussr",
        ops: 3
      }),
      degau: Map({
        name: "degaulle leads france",
        early: true,
        event: true,
        side: "ussr",
        ops: 3
      }),
      cns: Map({
        name: "captured nazi scientist",
        early: true,
        event: true,
        side: "neutral",
        ops: 2
      }),
      trum: Map({
        name: "truman doctrine",
        early: true,
        event: true,
        side: "us",
        ops: 1
      }),
      nato: Map({ name: "nato", early: true, event: true, side: "us", ops: 4 }),
      mp: Map({
        name: "marshall plan",
        early: true,
        event: true,
        side: "us",
        ops: 4
      }),
      indopw: Map({
        name: "indo-pakistani war",
        early: true,
        event: false,
        side: "neutral",
        ops: 2
      }),
      cont: Map({
        name: "containment",
        early: true,
        event: true,
        side: "us",
        ops: 3
      }),
      cia: Map({
        name: "cia created",
        early: true,
        event: true,
        side: "us",
        ops: 1
      }),
      suez: Map({
        name: "suez crisis",
        early: true,
        event: true,
        side: "ussr",
        ops: 3
      }),
      eeu: Map({
        name: "east european unrest",
        early: true,
        event: false,
        side: "us",
        ops: 3
      }),
      decol: Map({
        name: "decolonization",
        early: true,
        event: false,
        side: "ussr",
        ops: 2
      }),
      destal: Map({
        name: "destalinization",
        early: true,
        event: true,
        side: "ussr",
        ops: 3
      }),
      un: Map({
        name: "un intervention",
        early: true,
        event: false,
        side: "neutral",
        ops: 1
      }),
      ntb: Map({
        name: "nuclear test ban",
        early: true,
        event: false,
        side: "neutral",
        ops: 4
      }),
      form: Map({
        name: "formosan resolution",
        early: true,
        event: true,
        side: "us",
        ops: 2
      }),
      def: Map({
        name: "defectors",
        early: true,
        event: false,
        side: "us",
        ops: 2
      }),
      cent: Map({
        name: "central american scoring",
        mid: true,
        event: false,
        side: "neutral",
        scoringcard: true
      }),
      armsr: Map({
        name: "arms race",
        mid: true,
        event: false,
        side: "neutral",
        ops: 3
      }),
      cubmc: Map({
        name: "cuban missile crisis",
        mid: true,
        event: true,
        side: "neutral",
        ops: 3
      }),
      nsubs: Map({
        name: "nuclear subs",
        mid: true,
        event: true,
        side: "us",
        ops: 2
      }),
      quag: Map({
        name: "quagmire",
        mid: true,
        event: true,
        side: "ussr",
        ops: 3
      }),
      salt: Map({
        name: "salt negotiations",
        mid: true,
        event: true,
        side: "neutral",
        ops: 3
      }),
      bear: Map({
        name: "bear trap",
        mid: true,
        event: true,
        side: "us",
        ops: 3
      }),
      summ: Map({
        name: "summit",
        mid: true,
        event: false,
        side: "neutral",
        ops: 1
      }),
      howil: Map({
        name: "how i learned to stop worrying",
        mid: true,
        event: true,
        side: "neutral",
        ops: 2
      }),
      junta: Map({
        name: "junta",
        mid: true,
        event: false,
        side: "neutral",
        ops: 2
      }),
      kitch: Map({
        name: "kitchen debates",
        mid: true,
        event: true,
        side: "us",
        ops: 1
      }),
      misenv: Map({
        name: "missile envy",
        mid: true,
        event: false,
        side: "neutral",
        ops: 2
      }),
      wwby: Map({
        name: "we will bury you",
        mid: true,
        event: true,
        side: "ussr",
        ops: 4
      }),
      brez: Map({
        name: "brezhnev doctrine",
        mid: true,
        event: true,
        side: "ussr",
        ops: 3
      }),
      port: Map({
        name: "portuguese empire crumbles",
        mid: true,
        event: true,
        side: "ussr",
        ops: 2
      }),
      safrun: Map({
        name: "south african unrest",
        mid: true,
        event: false,
        side: "ussr",
        ops: 2
      }),
      all: Map({
        name: "allende",
        mid: true,
        event: true,
        side: "ussr",
        ops: 1
      }),
      musrev: Map({
        name: "muslim revolution",
        mid: true,
        event: false,
        side: "ussr",
        ops: 4
      }),
      cult: Map({
        name: "cultural revolution",
        mid: true,
        event: true,
        side: "ussr",
        ops: 3
      }),
      flowr: Map({
        name: "flower power",
        mid: true,
        event: true,
        side: "ussr",
        ops: 4
      }),
      u2: Map({
        name: "U-2 incident",
        mid: true,
        event: true,
        side: "ussr",
        ops: 3
      }),
      opec: Map({
        name: "opec",
        mid: true,
        event: false,
        side: "ussr",
        ops: 3
      }),
      lone: Map({
        name: "lone gunman",
        mid: true,
        event: true,
        side: "ussr",
        ops: 1
      }),
      crg: Map({
        name: "colonial rear guards",
        mid: true,
        event: false,
        side: "us",
        ops: 2
      }),
      panam: Map({
        name: "panama canal returned",
        mid: true,
        event: true,
        side: "us",
        ops: 1
      }),
      camp: Map({
        name: "camp david accords",
        mid: true,
        event: true,
        side: "us",
        ops: 2
      }),
      pupp: Map({
        name: "puppet governments",
        mid: true,
        event: true,
        side: "us",
        ops: 2
      }),
      gsales: Map({
        name: "grain sales to soviets",
        mid: true,
        event: false,
        side: "us",
        ops: 2
      }),
      jp2: Map({
        name: "john paul II elected pope",
        mid: true,
        event: true,
        side: "us",
        ops: 2
      }),
      lads: Map({
        name: "latin american death squads",
        mid: true,
        event: false,
        side: "neutral",
        ops: 2
      }),
      nix: Map({
        name: "nixon plays the china card",
        mid: true,
        event: true,
        side: "us",
        ops: 2
      }),
      oas: Map({
        name: "oas founded",
        mid: true,
        event: true,
        side: "us",
        ops: 1
      }),
      saddat: Map({
        name: "saddat expels soviets",
        mid: true,
        event: true,
        side: "us",
        ops: 1
      }),
      shutt: Map({
        name: "shuttle diplomacy",
        mid: true,
        event: true,
        side: "us",
        ops: 3
      }),
      voa: Map({
        name: "voice of america",
        mid: true,
        event: false,
        side: "us",
        ops: 2
      }),
      lib: Map({
        name: "liberation theology",
        mid: true,
        event: false,
        side: "ussr",
        ops: 2
      }),
      ussu: Map({
        name: "ussuri river skirmish",
        mid: true,
        event: true,
        side: "us",
        ops: 3
      }),
      ask: Map({
        name: "ask not what your country...",
        mid: true,
        event: true,
        side: "us",
        ops: 3
      }),
      allpro: Map({
        name: "alliance for progress",
        mid: true,
        event: true,
        side: "us",
        ops: 3
      }),
      afr: Map({
        name: "african scoring",
        mid: true,
        event: false,
        side: "neutral",
        scoringcard: true
      }),
      one: Map({
        name: "one small step",
        mid: true,
        event: false,
        side: "neutral",
        ops: 2
      }),
      soam: Map({
        name: "south america scoring",
        mid: true,
        event: false,
        side: "neutral",
        scoringcard: true
      }),
      hostage: Map({
        name: "iranian hostage crisis",
        late: true,
        event: true,
        side: "ussr",
        ops: 3
      }),
      ironl: Map({
        name: "the iron lady",
        late: true,
        event: true,
        side: "us",
        ops: 3
      }),
      reagan: Map({
        name: "reagan bombs libya",
        late: true,
        event: true,
        side: "us",
        ops: 2
      }),
      sw: Map({
        name: "star wars",
        late: true,
        event: true,
        side: "us",
        ops: 2
      }),
      norsea: Map({
        name: "north sea oil",
        late: true,
        event: true,
        side: "us",
        ops: 3
      }),
      refo: Map({
        name: "the reformer",
        late: true,
        event: true,
        side: "ussr",
        ops: 3
      }),
      marine: Map({
        name: "marine barracks bombing",
        late: true,
        event: true,
        side: "ussr",
        ops: 2
      }),
      kal: Map({
        name: "soviets shoot down KAL-007",
        late: true,
        event: true,
        side: "us",
        ops: 4
      }),
      glas: Map({
        name: "glasnost",
        late: true,
        event: true,
        side: "ussr",
        ops: 4
      }),
      ortega: Map({
        name: "ortega elected in nicaragua",
        late: true,
        event: true,
        side: "ussr",
        ops: 2
      }),
      terr: Map({
        name: "terrorism",
        late: true,
        event: false,
        side: "neutral",
        ops: 2
      }),
      contra: Map({
        name: "iron-contra scandal",
        late: true,
        event: true,
        side: "ussr",
        ops: 2
      }),
      chern: Map({
        name: "chernobyl",
        late: true,
        event: true,
        side: "us",
        ops: 3
      }),
      ladc: Map({
        name: "latin american debt crisis",
        late: true,
        event: false,
        side: "ussr",
        ops: 2
      }),
      tdtw: Map({
        name: "tear down this wall",
        late: true,
        event: true,
        side: "us",
        ops: 3
      }),
      evil: Map({
        name: "an evil empire",
        late: true,
        event: true,
        side: "us",
        ops: 3
      }),
      aldr: Map({
        name: "aldrich ames remix",
        late: true,
        event: true,
        side: "ussr",
        ops: 3
      }),
      persh: Map({
        name: "pershing II deployed",
        late: true,
        event: true,
        side: "ussr",
        ops: 3
      }),
      warg: Map({
        name: "wargames",
        late: true,
        event: true,
        side: "neutral",
        ops: 4
      }),
      solid: Map({
        name: "solidarity",
        late: true,
        event: true,
        side: "us",
        ops: 2
      }),
      iiw: Map({
        name: "iran iraq war",
        late: true,
        event: true,
        side: "neutral",
        ops: 2
      }),
      camb: Map({
        name: "the cambridge five",
        late: true,
        event: false,
        side: "ussr",
        ops: 2
      }),
      specr: Map({
        name: "special relationship",
        late: true,
        event: false,
        side: "us",
        ops: 2
      }),
      nord: Map({ name: "norad", late: true, event: true, side: "us", ops: 3 }),
      che: Map({ name: "che", late: true, event: true, side: "ussr", ops: 3 }),
      tehran: Map({
        name: "our man in tehran",
        late: true,
        event: true,
        side: "us",
        ops: 2
      }),
      awac: Map({
        name: "awacs sale to saudis",
        late: true,
        event: true,
        side: "us",
        ops: 3
      })
    });
  static cardRanking = () =>
    Seq([
      "ireds",
      "romabd",
      "olymp",
      "yuri",
      "kitch",
      "ironl",
      "norsea",
      "evil",
      "awac",
      "eeu",
      "shutt",
      "reagan",
      "one",
      "cns",
      "iiw",
      "lads",
      "ladc",
      "summ",
      "come",
      "persh",
      "u2",
      "contra",
      "viet",
      "willy",
      "cont",
      "camp",
      "jp2",
      "form",
      "solid",
      "tehran",
      "specr",
      "armsr",
      "cubmc",
      "howil",
      "indopw",
      "un",
      "brez",
      "hostage",
      "warsaw",
      "marine",
      "port",
      "arisw",
      "camb",
      "ortega",
      "fidel",
      "allpro",
      "d&c",
      "sea",
      "kal",
      "tdtw",
      "ask",
      "chern",
      "fyp",
      "sw",
      "nsubs",
      "pupp",
      "nix",
      "oas",
      "saddat",
      "panam",
      "salt",
      "terr",
      "misenv",
      "flowr",
      "musrev",
      "glas",
      "che",
      "opec",
      "degau",
      "cult",
      "socgov",
      "suez",
      "quag",
      "safrun",
      "korw",
      "nass",
      "trum",
      "bw",
      "mp",
      "nato",
      "nord",
      "bear",
      "ussu",
      "def",
      "voa",
      "gsales",
      "crg",
      "soam",
      "afr",
      "cent",
      "ntb",
      "junta",
      "wwby",
      "refo",
      "aldr",
      "lib",
      "all",
      "destal",
      "decol",
      "japan",
      "block",
      "rsp",
      "mes",
      "eu",
      "asia",
      "lone",
      "cia",
      "warg"
    ]);

  // console.log(Seq([1,2,3]).reduce((c,n) => n, 0))
  static cardsWithImportance = () =>
    Cards.cardRanking().reduce(
      (accum, card) => [
        accum[0] + 1,
        accum[1].setIn([card, "importance"], accum[0])
      ],
      [1, Cards.cards()]
    )[1];
}
export default Cards;
