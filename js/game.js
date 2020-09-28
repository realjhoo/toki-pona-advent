"use strict";
const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-buttons");

let state = {};

// --------------------------------------------------------
function startGame() {
  state = {};
  showTextNode(1);
}

// --------------------------------------------------------
function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  textElement.innerText = textNode.text;
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  textNode.options.forEach((option) => {
    if (showOption(option)) {
      const button = document.createElement("button");
      button.innerText = option.text;
      button.classList.add("btn");
      button.addEventListener("click", () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });
}

// --------------------------------------------------------
function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

// --------------------------------------------------------
function selectOption(option) {
  const nextTextNodeID = option.nextText;
  if (nextTextNodeID <= 0) {
    return startGame();
  }
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeID);
}

// --------------------------------------------------------
const textNodes = [
  {
    id: 1,
    text:
      "After an all night party, you wake up in a strange place. Next to you is a jar of blue goo.",
    options: [
      {
        text: "Take the goo",
        setState: { blueGoo: true },
        nextText: 2,
      },
      {
        text: "Gross! Leave it!",
        nextText: 2,
      },
    ],
  },
  {
    id: 2,
    text:
      "Looking for answers, you wander around until you find a merchant rubbing his hands together.",
    options: [
      {
        text: "Trade the goo for a sword",
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3,
      },
      {
        text: "Trade the goo for a shield",
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 3,
      },
      {
        text: "Ignore the merchant",
        nextText: 3,
      },
    ],
  },
  {
    id: 3,
    text:
      "After leaving the merchant you begin to feel tired. You find a small village in the shadow of a scary looking castle.",
    options: [
      {
        text: "Explore the castle",
        nextText: 4,
      },
      {
        text: "Find a room to sleep at in the village",
        nextText: 5,
      },
      {
        text: "Find some hay in a stable to sleep in",
        nextText: 6,
      },
    ],
  },
  {
    id: 4,
    text:
      "The castle has dozens of twisty passages all alike. You feel unexplainably tired. Finding a bed in one of the passages, you fall asleep. Unfortunately, you are killed by a terrible monster in your sleep. The good news is that you never felt a thing.",
    options: [
      {
        text: "Play Again",
        nextText: -1,
      },
    ],
  },
  {
    id: 5,
    text:
      "Without any money to rent a room, you break into an inn and fall asleep. After a few hours of sleep the owner of the inn finds you and has the town guard lock you in a cell where you are killed by a fellow prisoner.",
    options: [
      {
        text: "Play Again",
        nextText: -1,
      },
    ],
  },
  {
    id: 6,
    text:
      "You wake up well rested and full of energy ready to explore the nearby castle.",
    options: [
      {
        text: "Explore the castle",
        nextText: 7,
      },
    ],
  },
  {
    id: 7,
    text:
      "While exploring the castle you come across a horrible monster in your path.",
    options: [
      {
        text: "Try to run",
        nextText: 8,
      },
      {
        text: "Attack it with your sword",
        requiredState: (currentState) => currentState.sword,
        nextText: 9,
      },
      {
        text: "Hide behind your shield",
        requiredState: (currentState) => currentState.shield,
        nextText: 10,
      },
      {
        text: "Throw the blue goo at it",
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11,
      },
    ],
  },
  {
    id: 8,
    text:
      "Your attempts to run are in vain and the monster easily catches you and kills you",
    options: [
      {
        text: "Play Again",
        nextText: -1,
      },
    ],
  },
  {
    id: 9,
    text:
      "You foolishly thought this monster could be slain with a single sword. Bwahahahaha! He eats you.",
    options: [
      {
        text: "Play Again",
        nextText: -1,
      },
    ],
  },
  {
    id: 10,
    text:
      "The monster laughs as you hide behind your shield. He eats you, shield and all.",
    options: [
      {
        text: "Play Again",
        nextText: -1,
      },
    ],
  },
  {
    id: 11,
    text:
      "You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your own and live out the rest of your days there.",
    options: [
      {
        text: "Congratulations. Play Again.",
        nextText: -1,
      },
    ],
  },
];

// --------------------------------------------------------
startGame();
