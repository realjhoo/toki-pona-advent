// --------------------------------------------------------
const textNodes = [
  {
    id: 1,
    text:
      "pini tenpo pimeja ale musi e ni: sina lape pini insa tomo nasa. poka sina e ni: poki pi ko laso suli. ",
    options: [
      {
        text: "o tawa li ko",
        setState: { blueGoo: true },
        nextText: 2,
      },
      {
        text: "jaki! tawa ala!",
        nextText: 2,
      },
    ],
  },
  {
    id: 2,
    text:
      " sina tawalukin sona. sina lukin jan esun. jan esun li luka lon luka. ",
    options: [
      {
        text:
          "sina palisa jan esun e poki pi ko laso-suwi jan esun li pana sina e palisa utala jan",
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3,
      },
      {
        text:
          "sina palisa jan esun e poki pi ko laso-suwi jan esun li pana sina e sinpin utala.",
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 3,
      },
      {
        text: "sina toki ala tawa jan esun.",
        nextText: 3,
      },
    ],
  },
  {
    id: 3,
    text:
      " sina weka jan esun. sina open pilin lape. sina lukin la tomo lili li lon tomo utala monsuta. ",
    options: [
      {
        text: "sina lukin insa tomo utala monsuta",
        nextText: 4,
      },
      {
        text: "sina lukin tomo-lape insa ma tomo lili.",
        nextText: 5,
      },
      {
        text: "sina lukin kasi telo ala. sina lape insa kasi telo ala.",
        nextText: 6,
      },
    ],
  },
  {
    id: 4,
    text:
      " tomo utala li jo e tomo mute mute. tomo li sama ale. sina pilin lape. sina lukin supa lape insa tomo. sina lape lon ni. o ike. sina moli e monsuta sina pilin ala. ",
    options: [
      {
        text: "o ike. musi sama.",
        nextText: -1,
      },
    ],
  },
  {
    id: 5,
    text:
      " sina jo mani ala. sina pakala insa e tomo-lape esun. sina lape tenpo lili. jan pi tomo-lape esun li pana sina e ma tomo-lili utala. sina insa poki utala. jan ike moli e sina. ",
    options: [
      {
        text: "o ike. musi sama.",
        nextText: -1,
      },
    ],
  },
  {
    id: 6,
    text:
      " sina lape pini. sina pilin pona. sina wile tawa insa tomo-utala monsuta. ",
    options: [
      {
        text: "sina lukin insa tomo-utala-monsuta.",
        nextText: 7,
      },
    ],
  },
  {
    id: 7,
    text: " insa tomo-utala li sina lukin jan ike-monsuta. ",
    options: [
      {
        text: "sina tawa weka.",
        nextText: 8,
      },
      {
        text: "sina utala jan monsuta e ni: sina utala palisa.",
        requiredState: (currentState) => currentState.sword,
        nextText: 9,
      },
      {
        text: "sina tawa monsi utala-sinpin sina.",
        requiredState: (currentState) => currentState.shield,
        nextText: 10,
      },
      {
        text: "sina THROW poki pi ko laso-suwi.",
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11,
      },
    ],
  },
  {
    id: 8,
    text: " sina tawa weka li ike. jan monsuta li jo sina. one le sina moli. ",
    options: [
      {
        text: "o ike. musi sama.",
        nextText: -1,
      },
    ],
  },
  {
    id: 9,
    text:
      " sina sona nasa e ni: jan monsuta li moli la utala-palisa. a a a a. ona li moku e sina. ",
    options: [
      {
        text: "o ike. musi sama.",
        nextText: -1,
      },
    ],
  },
  {
    id: 10,
    text: " jan monsuta toki e ni: a a a a. ona li sina moku. ",
    options: [
      {
        text: "o ike. musi sama.",
        nextText: -1,
      },
    ],
  },
  {
    id: 11,
    text:
      " sina THROW poki pi ko laso-suwi tama jan monsuta. ona EXPLODED. jan monsuta li moli. sina wile jo tomo utala. tomo-utala li jo sina pi tenpo ale. ",
    options: [
      {
        text: "o pona. musi sama. ",
        nextText: -1,
      },
    ],
  },
];
export { textNodes };
