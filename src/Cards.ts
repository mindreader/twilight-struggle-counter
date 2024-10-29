// @ts-nocheck

import { Map, Seq, Set } from "immutable";

class Cards {
  static rawCards = () =>
    Map({
      japan: Map({
        name: "us / japan pact",
        cn: "美日共同防卫协定",
        early: true,
        event: true,
        side: "us",
        ops: 4
      }),
      assc: Map({
        name: "asia scoring",
        cn: "亚洲计分",
        early: true,
        event: false,
        side: "neutral",
        scoringcard: true
      }),
      eusc: Map({
        name: "europe scoring",
        cn: "欧洲计分",
        early: true,
        event: false,
        side: "neutral",
        scoringcard: true
      }),
      mesc: Map({
        name: "middle east scoring",
        cn: "中东计分",
        early: true,
        event: false,
        side: "neutral",
        scoringcard: true
      }),
      seasc: Map({
        name: "southeast asia scoring",
        cn: "东南亚计分",
        mid: true,
        event: true,
        side: "neutral",
        scoringcard: true
      }),
      romabd: Map({
        name: "romanian abdication",
        cn: "罗马尼亚颠覆",
        early: true,
        event: true,
        side: "ussr",
        ops: 1
      }),
      ireds: Map({
        name: "independent reds",
        cn: "独立的红色",
        early: true,
        event: true,
        side: "us",
        ops: 2
      }),
      olymp: Map({
        name: "olympic games",
        cn: "奥利匹克运动会",
        early: true,
        event: false,
        side: "neutral",
        ops: 2
      }),
      rsp: Map({
        name: "redscare / purge",
        cn: "红色恐怖/清洗",
        early: true,
        event: false,
        side: "neutral",
        ops: 4
      }),
      bw: Map({
        name: "brush war",
        cn: "局部战争",
        mid: true,
        event: false,
        side: "neutral",
        ops: 3
      }),
      willy: Map({
        name: "willy brandt",
        cn: "德国总统维利·勃兰特",
        mid: true,
        event: true,
        side: "ussr",
        ops: 2
      }),
      "d&c": Map({
        name: "duck and cover",
        cn: "躲避与掩护",
        early: true,
        event: false,
        side: "us",
        ops: 3
      }),
      fyp: Map({
        name: "five year plan",
        cn: "五年计划",
        early: true,
        event: false,
        side: "us",
        ops: 3
      }),
      socgov: Map({
        name: "socialist governments",
        cn: "社会主义政府",
        early: true,
        event: false,
        side: "ussr",
        ops: 3
      }),
      yuri: Map({
        name: "yuri & samantha",
        cn: "尤里和萨曼莎",
        late: true,
        event: true,
        side: "ussr",
        ops: 2
      }),
      fidel: Map({
        name: "fidel",
        cn: "菲德尔·卡斯特罗",
        early: true,
        event: true,
        side: "ussr",
        ops: 2
      }),
      viet: Map({
        name: "vietnam revolts",
        cn: "越南起义",
        early: true,
        event: true,
        side: "ussr",
        ops: 2
      }),
      block: Map({
        name: "blockade",
        cn: "封锁",
        early: true,
        event: true,
        side: "ussr",
        ops: 1
      }),
      kwar: Map({
        name: "korean war",
        cn: "朝鲜战争",
        early: true,
        event: true,
        side: "ussr",
        ops: 2
      }),
      aiwar: Map({
        name: "arabisraeli war",
        cn: "阿以战争",
        early: true,
        event: false,
        side: "ussr",
        ops: 2
      }),
      come: Map({
        name: "comecon",
        cn: "经济互助委员会",
        early: true,
        event: true,
        side: "ussr",
        ops: 3
      }),
      nass: Map({
        name: "nasser",
        cn: "埃及总统纳赛尔",
        early: true,
        event: true,
        side: "ussr",
        ops: 1
      }),
      warsaw: Map({
        name: "warsaw pact formed",
        cn: "华沙条约组织成立",
        early: true,
        event: true,
        side: "ussr",
        ops: 3
      }),
      degau: Map({
        name: "degaulle leads france",
        cn: "戴高乐领导法国",
        early: true,
        event: true,
        side: "ussr",
        ops: 3
      }),
      cns: Map({
        name: "captured nazi scientist",
        cn: "逮捕纳粹科学家",
        early: true,
        event: true,
        side: "neutral",
        ops: 1
      }),
      trum: Map({
        name: "truman doctrine",
        cn: "杜鲁门主义",
        early: true,
        event: true,
        side: "us",
        ops: 1
      }),
      nato: Map({ name: "nato", cn: "北大西洋公约组织", early: true, event: true, side: "us", ops: 4 }),
      mp: Map({
        name: "marshall plan",
        cn: "马歇尔计划",
        early: true,
        event: true,
        side: "us",
        ops: 4
      }),
      ipwar: Map({
        name: "indo-pakistani war",
        cn: "印巴战争",
        early: true,
        event: false,
        side: "neutral",
        ops: 2
      }),
      cont: Map({
        name: "containment",
        cn: "遏制政策",
        early: true,
        event: true,
        side: "us",
        ops: 3
      }),
      cia: Map({
        name: "cia created",
        cn: "建立中情局",
        early: true,
        event: true,
        side: "us",
        ops: 1
      }),
      suez: Map({
        name: "suez crisis",
        cn: "苏伊士运河危机",
        early: true,
        event: true,
        side: "ussr",
        ops: 3
      }),
      eeunr: Map({
        name: "east european unrest",
        cn: "东欧剧变",
        early: true,
        event: false,
        side: "us",
        ops: 3
      }),
      decol: Map({
        name: "decolonization",
        cn: "去殖民地化",
        early: true,
        event: false,
        side: "ussr",
        ops: 2
      }),
      destal: Map({
        name: "destalinization",
        cn: "去斯大林化",
        early: true,
        event: true,
        side: "ussr",
        ops: 3
      }),
      un: Map({
        name: "un intervention",
        cn: "联合国干预",
        early: true,
        event: false,
        side: "neutral",
        ops: 1
      }),
      ntb: Map({
        name: "nuclear test ban",
        cn: "禁止核爆试验",
        early: true,
        event: false,
        side: "neutral",
        ops: 4
      }),
      form: Map({
        name: "formosan resolution",
        cn: "台湾决议",
        early: true,
        event: true,
        side: "us",
        ops: 2
      }),
      def: Map({
        name: "defectors",
        cn: "背叛者",
        early: true,
        event: false,
        side: "us",
        ops: 2
      }),
      casc: Map({
        name: "central american scoring",
        cn: "中美洲计分",
        mid: true,
        event: false,
        side: "neutral",
        scoringcard: true
      }),
      armsr: Map({
        name: "arms race",
        cn: "军备竞赛",
        mid: true,
        event: false,
        side: "neutral",
        ops: 3
      }),
      cubmc: Map({
        name: "cuban missile crisis",
        cn: "古巴导弹危机",
        mid: true,
        event: true,
        side: "neutral",
        ops: 3
      }),
      nsubs: Map({
        name: "nuclear subs",
        cn: "核潜艇",
        mid: true,
        event: true,
        side: "us",
        ops: 2
      }),
      quag: Map({
        name: "quagmire",
        cn: "困境",
        mid: true,
        event: true,
        side: "ussr",
        ops: 3
      }),
      salt: Map({
        name: "salt negotiations",
        cn: "战略武器裁减谈判",
        mid: true,
        event: true,
        side: "neutral",
        ops: 3
      }),
      bear: Map({
        name: "bear trap",
        cn: "捕熊陷阱",
        mid: true,
        event: true,
        side: "us",
        ops: 3
      }),
      summ: Map({
        name: "summit",
        cn: "首脑会议",
        mid: true,
        event: false,
        side: "neutral",
        ops: 1
      }),
      howil: Map({
        name: "how i learned to stop worrying",
        cn: "我如何学会不再担忧",
        mid: true,
        event: true,
        side: "neutral",
        ops: 2
      }),
      junta: Map({
        name: "junta",
        cn: "军事独裁",
        mid: true,
        event: false,
        side: "neutral",
        ops: 2
      }),
      kitch: Map({
        name: "kitchen debates",
        cn: "厨房辩论",
        mid: true,
        event: true,
        side: "us",
        ops: 1
      }),
      misenv: Map({
        name: "missile envy",
        cn: "导弹嫉妒",
        mid: true,
        event: false,
        side: "neutral",
        ops: 2
      }),
      wwby: Map({
        name: "we will bury you",
        cn: "我们会埋葬你们的",
        mid: true,
        event: true,
        side: "ussr",
        ops: 4
      }),
      brez: Map({
        name: "brezhnev doctrine",
        cn: "勃列日涅夫主义",
        mid: true,
        event: true,
        side: "ussr",
        ops: 3
      }),
      portu: Map({
        name: "portuguese empire crumbles",
        cn: "葡萄牙王国崩溃",
        mid: true,
        event: true,
        side: "ussr",
        ops: 2
      }),
      safrun: Map({
        name: "south african unrest",
        cn: "南非动荡",
        mid: true,
        event: false,
        side: "ussr",
        ops: 2
      }),
      allend: Map({
        name: "allende",
        cn: "智利总统阿言德",
        mid: true,
        event: true,
        side: "ussr",
        ops: 1
      }),
      musrev: Map({
        name: "muslim revolution",
        cn: "穆斯林起义",
        mid: true,
        event: false,
        side: "ussr",
        ops: 4
      }),
      cult: Map({
        name: "cultural revolution",
        cn: "文化大革命",
        mid: true,
        event: true,
        side: "ussr",
        ops: 3
      }),
      flowr: Map({
        name: "flower power",
        cn: "花朵力量",
        mid: true,
        event: true,
        side: "ussr",
        ops: 4
      }),
      u2: Map({
        name: "U-2 incident",
        cn: "U-2侦察机事件",
        mid: true,
        event: true,
        side: "ussr",
        ops: 3
      }),
      opec: Map({
        name: "opec",
        cn: "石油输出国组织",
        mid: true,
        event: false,
        side: "ussr",
        ops: 3
      }),
      lone: Map({
        name: "lone gunman",
        cn: "独行枪手",
        mid: true,
        event: true,
        side: "ussr",
        ops: 1
      }),
      colrg: Map({
        name: "colonial rear guards",
        cn: "殖民后卫",
        mid: true,
        event: false,
        side: "us",
        ops: 2
      }),
      panam: Map({
        name: "panama canal returned",
        cn: "归还巴拿马运河",
        mid: true,
        event: true,
        side: "us",
        ops: 1
      }),
      camp: Map({
        name: "camp david accords",
        cn: "戴维营协议",
        mid: true,
        event: true,
        side: "us",
        ops: 2
      }),
      pupp: Map({
        name: "puppet governments",
        cn: "傀儡政府",
        mid: true,
        event: true,
        side: "us",
        ops: 2
      }),
      gsales: Map({
        name: "grain sales to soviets",
        cn: "向苏联出售谷物",
        mid: true,
        event: false,
        side: "us",
        ops: 2
      }),
      jp2: Map({
        name: "john paul II elected pope",
        cn: "约翰·保罗二世当选教皇",
        mid: true,
        event: true,
        side: "us",
        ops: 2
      }),
      lads: Map({
        name: "latin american death squads",
        cn: "拉丁美洲敢死队",
        mid: true,
        event: false,
        side: "neutral",
        ops: 2
      }),
      nixon: Map({
        name: "nixon plays the china card",
        cn: "尼克松打出中国牌",
        mid: true,
        event: true,
        side: "us",
        ops: 2
      }),
      oas: Map({
        name: "oas founded",
        cn: "美洲国家组织创立",
        mid: true,
        event: true,
        side: "us",
        ops: 1
      }),
      sadat: Map({
        name: "sadat expels soviets",
        cn: "埃及总统萨达特驱逐苏维埃",
        mid: true,
        event: true,
        side: "us",
        ops: 1
      }),
      shutt: Map({
        name: "shuttle diplomacy",
        cn: "穿梭外交",
        mid: true,
        event: false,
        side: "us",
        ops: 3
      }),
      voa: Map({
        name: "voice of america",
        cn: "美国之音",
        mid: true,
        event: false,
        side: "us",
        ops: 2
      }),
      lib: Map({
        name: "liberation theology",
        cn: "解放神学",
        mid: true,
        event: false,
        side: "ussr",
        ops: 2
      }),
      ussu: Map({
        name: "ussuri river skirmish",
        cn: "乌苏里江冲突",
        mid: true,
        event: true,
        side: "us",
        ops: 3
      }),
      asknot: Map({
        name: "ask not what your country...",
        cn: "不要问你的国家能为你做什么",
        mid: true,
        event: true,
        side: "us",
        ops: 3
      }),
      allpro: Map({
        name: "alliance for progress",
        cn: "美洲进步同盟",
        mid: true,
        event: true,
        side: "us",
        ops: 3
      }),
      afsc: Map({
        name: "africa scoring",
        cn: "非洲计分",
        mid: true,
        event: false,
        side: "neutral",
        scoringcard: true
      }),
      onest: Map({
        name: "one small step",
        cn: "一小步",
        mid: true,
        event: false,
        side: "neutral",
        ops: 2
      }),
      sasc: Map({
        name: "south america scoring",
        cn: "南美洲计分",
        mid: true,
        event: false,
        side: "neutral",
        scoringcard: true
      }),
      hostage: Map({
        name: "iranian hostage crisis",
        cn: "伊朗人质危机",
        late: true,
        event: true,
        side: "ussr",
        ops: 3
      }),
      ironl: Map({
        name: "the iron lady",
        cn: "铁娘子",
        late: true,
        event: true,
        side: "us",
        ops: 3
      }),
      reagan: Map({
        name: "reagan bombs libya",
        cn: "里根轰炸利比亚",
        late: true,
        event: true,
        side: "us",
        ops: 2
      }),
      sw: Map({
        name: "star wars",
        cn: "星球大战",
        late: true,
        event: true,
        side: "us",
        ops: 2
      }),
      norsea: Map({
        name: "north sea oil",
        cn: "北海石油",
        late: true,
        event: true,
        side: "us",
        ops: 3
      }),
      refo: Map({
        name: "the reformer",
        cn: "改革家",
        late: true,
        event: true,
        side: "ussr",
        ops: 3
      }),
      marine: Map({
        name: "marine barracks bombing",
        cn: "轰炸海军陆战队兵营",
        late: true,
        event: true,
        side: "ussr",
        ops: 2
      }),
      kal: Map({
        name: "soviets shoot down KAL-007",
        cn: "苏联击落韩国航空公司——007航班",
        late: true,
        event: true,
        side: "us",
        ops: 4
      }),
      glas: Map({
        name: "glasnost",
        cn: "开放",
        late: true,
        event: true,
        side: "ussr",
        ops: 4
      }),
      ortega: Map({
        name: "ortega elected in nicaragua",
        cn: "奥特加当选尼加拉瓜总统",
        late: true,
        event: true,
        side: "ussr",
        ops: 2
      }),
      terror: Map({
        name: "terrorism",
        cn: "恐怖主义",
        late: true,
        event: false,
        side: "neutral",
        ops: 2
      }),
      contra: Map({
        name: "iran-contra scandal",
        cn: "伊朗们丑闻",
        late: true,
        event: true,
        side: "ussr",
        ops: 2
      }),
      chern: Map({
        name: "chernobyl",
        cn: "切尔诺贝利",
        late: true,
        event: true,
        side: "us",
        ops: 3
      }),
      ladc: Map({
        name: "latin american debt crisis",
        cn: "拉丁美洲债务危机",
        late: true,
        event: false,
        side: "ussr",
        ops: 2
      }),
      tdtw: Map({
        name: "tear down this wall",
        cn: "推倒柏林围墙",
        late: true,
        event: true,
        side: "us",
        ops: 3
      }),
      evil: Map({
        name: "an evil empire",
        cn: "邪恶帝国",
        late: true,
        event: true,
        side: "us",
        ops: 3
      }),
      aldr: Map({
        name: "aldrich ames remix",
        cn: "奥德里奇·艾姆斯",
        late: true,
        event: true,
        side: "ussr",
        ops: 3
      }),
      persh: Map({
        name: "pershing II deployed",
        cn: "部署潘兴二型导弹",
        late: true,
        event: true,
        side: "ussr",
        ops: 3
      }),
      warg: Map({
        name: "wargames",
        cn: "战争游戏",
        late: true,
        event: true,
        side: "neutral",
        ops: 4
      }),
      solid: Map({
        name: "solidarity",
        cn: "团结工会",
        late: true,
        event: true,
        side: "us",
        ops: 2
      }),
      iiw: Map({
        name: "iran iraq war",
        cn: "两伊战争",
        late: true,
        event: true,
        side: "neutral",
        ops: 2
      }),
      camb: Map({
        name: "the cambridge five",
        cn: "剑桥五杰",
        early: true,
        event: false,
        side: "ussr",
        ops: 2
      }),
      sprel: Map({
        name: "special relationship",
        cn: "英美特殊关系",
        early: true,
        event: false,
        side: "us",
        ops: 2
      }),
      nord: Map({ name: "norad", cn: "北美防空司令部", early: true, event: true, side: "us", ops: 3 }),
      che: Map({ name: "che", cn: "切·格瓦拉", mid: true, event: false, side: "ussr", ops: 3 }),
      tehran: Map({
        name: "our man in tehran",
        cn: "我们的人在德黑兰",
        mid: true,
        event: true,
        side: "us",
        ops: 2
      }),
      awacs: Map({
        name: "awacs sale to saudis",
        cn: "向沙特阿拉伯出售机载空中警报控制系统",
        late: true,
        event: true,
        side: "us",
        ops: 3
      }),
      abm: Map({
        name: "ABM treaty",
        cn: "反弹道导弹条约",
        mid: true,
        event: false,
        side: "neutral",
        ops: 4
      })
    });
  static cardRanking = () =>
    Seq([
      "summ",
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
