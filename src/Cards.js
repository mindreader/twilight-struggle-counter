const { Map, Seq, Set } = require("immutable");

class Cards {
  static rawCards = () =>
    Map({
      japan: Map({
        name: "us / japan pact",
        early: true,
        event: true,
        side: "us",
        ops: 4
      }),
      assc: Map({
        name: "asia scoring",
        early: true,
        event: false,
        side: "neutral",
        scoringcard: true
      }),
      eusc: Map({
        name: "europe scoring",
        early: true,
        event: false,
        side: "neutral",
        scoringcard: true
      }),
      mesc: Map({
        name: "middle east scoring",
        early: true,
        event: false,
        side: "neutral",
        scoringcard: true
      }),
      seasc: Map({
        key: "sea",
        name: "southeast asia scoring",
        mid: true,
        event: true,
        side: "neutral",
        scoringcard: true
      }),
      romabd: Map({
        name: "romanian abdication",
        early: true,
        event: true,
        side: "ussr",
        ops: 1
      }),
      ireds: Map({
        name: "independent reds",
        early: true,
        event: true,
        side: "us",
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
        ops: 3
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
      kwar: Map({
        name: "korean war",
        early: true,
        event: true,
        side: "ussr",
        ops: 2
      }),
      aiwar: Map({
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
        ops: 1
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
      ipwar: Map({
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
      eeunr: Map({
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
      casc: Map({
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
      portu: Map({
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
      allend: Map({
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
      colrg: Map({
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
      nixon: Map({
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
      sadat: Map({
        name: "sadat expels soviets",
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
      asknot: Map({
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
      afsc: Map({
        name: "africa scoring",
        mid: true,
        event: false,
        side: "neutral",
        scoringcard: true
      }),
      onest: Map({
        name: "one small step",
        mid: true,
        event: false,
        side: "neutral",
        ops: 2
      }),
      sasc: Map({
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
      terror: Map({
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
        early: true,
        event: false,
        side: "ussr",
        ops: 2
      }),
      sprel: Map({
        name: "special relationship",
        early: true,
        event: false,
        side: "us",
        ops: 2
      }),
      nord: Map({ name: "norad", early: true, event: true, side: "us", ops: 3 }),
      che: Map({ name: "che", mid: true, event: true, side: "ussr", ops: 3 }),
      tehran: Map({
        name: "our man in tehran",
        mid: true,
        event: true,
        side: "us",
        ops: 2
      }),
      awacs: Map({
        name: "awacs sale to saudis",
        late: true,
        event: true,
        side: "us",
        ops: 3
      }),
      abm: Map({
        name: "ABM treaty",
        mid: true,
        event: false,
        side: "neutral",
        ops: 4
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
      "awacs",
      "eeunr",
      "shutt",
      "reagan",
      "onest",
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
      "sprel",
      "armsr",
      "cubmc",
      "howil",
      "ipwar",
      "un",
      "brez",
      "hostage",
      "warsaw",
      "marine",
      "portu",
      "aiwar",
      "camb",
      "ortega",
      "fidel",
      "allpro",
      "d&c",
      "seasc",
      "kal",
      "tdtw",
      "asknot",
      "chern",
      "fyp",
      "sw",
      "nsubs",
      "pupp",
      "nixon",
      "oas",
      "sadat",
      "panam",
      "salt",
      "terror",
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
      "kwar",
      "nass",
      "trum",
      "mp",
      "nato",
      "nord",
      "bear",
      "ussu",
      "def",
      "voa",
      "gsales",
      "colrg",
      "sasc",
      "afsc",
      "casc",
      "ntb",
      "junta",
      "wwby",
      "refo",
      "aldr",
      "lib",
      "allend",
      "destal",
      "decol",
      "japan",
      "block",
      "bw",
      "abm",
      "rsp",
      "mesc",
      "eusc",
      "assc",
      "lone",
      "cia",
      "warg"
    ]);

  // List of cards to watch out for in regions which which they effect.
  static cardRegions = (cardsRemoved, validStarWarsTargets, phase) => {
    let cards = Map({
      // we aren't including ones no one will play like olympic games or summit.
      suicide: Set(["cia", "lone", "d&c", "wwby", "ortega", "kal", "gsales"]),
      // cards that are commonly used to improve the defcon to get rid of a bad card
      defconimprovers: Set(["salt", "howil", "ntb"]),
      // cards that are commonly used to degrade the defcon by the US to prevent bad card from leaving
      defconincreasers: Set(["howil", "cubmc", "gsales"]),
      // cards capable of ditching score cards.
      badcarddiscarders: Set(["asknot", "fyp", "aldr"]),
      warcards: Set(["iiw", "aiwar", "ipwar", "bw", "kwar"]),
      // china card stealers
      china: Set(["nixon", "cult", "ussu"]),
      // card stealers / discarders you should be aware of
      cardstealers: Set(["gsales", "misenv", "aldr", "fyp", "block", "terror"]),

      // these cards could theoretically affect any region at any time when if headlined.
      all: Set(["destal", "bw", "nsubs", "abm", "pupp", "cam"]),
      eu: Set([
        "eusc",
        "socgov",
        "block",
        "romabd",
        "come",
        "warsaw",
        "degau",
        "trum",
        "ireds",
        "mp",
        "suez",
        "eeunr",
        "willy",
        "voa",
        "refo",
        "tdtw",
        "persh",
        "jp2",
        "sprel"
      ]),
      me: Set(["mesc", "aiwar", "opec", "camp", "sadat", "voa", "hostage", "shutt", "awacs", "musrev", "nass"]),
      as: Set(["assc", "viet", "kwar", "ipwar", "japan", "decol", "form", "voa", "marine", "shutt"]),
      sea: Set(["seasc", "viet", "decol", "colrg", "voa", "ussu"]),
      sa: Set(["sasc", "junta", "allend", "panam", "oas", "voa", "ussu", "allpro", "ladc"]),
      ca: Set(["casc", "fidel", "junta", "panam", "oas", "voa", "lib", "ironl", "ortega"]),
      af: Set(["afsc", "decol", "portu", "colrg", "voa"])
    });

    if (cardsRemoved.has("jp2")) {
      cards = cards.updateIn(["eu"], s => s.add("solid"));
    }
    if (cardsRemoved.has("awacs")) {
      cards = cards.updateIn(["me"], s => s.remove("musrev"));
    }
    if (cardsRemoved.has("camp")) {
      cards = cards.updateIn(["me"], s => s.remove("aiwar"));
    }

    // cambridge five in late war
    if (phase === 3) cards = cards.updateIn(["all"], s => s.remove("cam"));

    // star wars, add to all categories
    if (phase === 3) {
      cards = cards.map((s, cat) => {
        const add = validStarWarsTargets.reduce((accum, card) => (s.has(card) ? true : accum), false);
        return add ? s.add("sw") : s;
      });
    }

    return cards;
  };

  static cards = () =>
    Cards.cardRanking().reduce((accum, card) => [accum[0] + 1, accum[1].setIn([card, "importance"], accum[0])], [
      1,
      Cards.rawCards()
    ])[1];
}
export default Cards;
