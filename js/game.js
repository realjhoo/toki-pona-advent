// TODO
// Restyle UX
// ***DONE *** ***** Erie glowing alien blue on black
// *** DONE *** ***** typing effect (but one word at a time)
// *** DONE *** ***** buttons to side (buttons could be in latin toki letters)
// ***** speech synth the text
// Translate Eng;lish string to toki pona
//  deploy linja pona font
// ***DONE*** play again should clear the board
"use strict";
const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-buttons");

let state = {};

// --------------------------------------------------------
function startGame() {
  textElement.innerText = "";
  state = {};
  showTextNode(1);
}

// --------------------------------------------------------
function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  textElement.innerText = textElement.innerText + textNode.text;
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  // ***** READING BIT
  // sayIt(textElement.innerText);

  // ***** TYPING BIT
  // typeit();

  // create the buttons
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
function sayIt(message) {
  // 1. this is buggy
  // 2. best lang for pronouncing toki pona?
  var msg = new SpeechSynthesisUtterance();

  let voices = speechSynthesis.getVoices();
  voices.forEach(function (voice, i) {});
  msg.voice = voices[36];

  msg.rate = 0.8;
  msg.text = message;
  window.speechSynthesis.speak(msg);
}

// --------------------------------------------------------
// TESTING ONE WORD AT A TIME
function typeit() {
  // this is in jquery... can you refactor as vanilla?
  var words, $el;
  var arrEl = [];

  // loop through each div and populate the array with the container (div) element and its text content split
  $(".example").each(function () {
    var $this = $(this);
    arrEl.push({ el: $this, words: $.trim($this.text()).split(" ") });
    $this.empty();
  });

  //This will the startup function
  function fadeIn() {
    var len = arrEl.length,
      obj = arrEl.shift() || {}; //get the top item from array and remove it from the array using array.shift
    $el = obj.el; //get the container from the item
    words = obj.words; //get the array of words
    //if there are any items in the array start the animation process for this item.
    if (len) window.setTimeout(transitionElement, 0);
  }

  function transitionElement() {
    var wlen = words.length,
      span = $("<span/>", { class: "hide" }).append(" " + words.shift()); //remove and get the top text string from the word array wrap it in span with a class "hide" which will hide it by default

    window.setTimeout(function () {
      if (wlen)
        //if words are available anymore then call show word
        showWord(span);
      //else call fadeIn to process the next container in the arrEl array of items
      else fadeIn();
    }, 0);
  }

  function showWord(span) {
    span.appendTo($el).fadeIn(1000, transitionElement); // append the span to the container with an animation duration of 500ms and in the complete callback of this invoke transitionElement to process the next word or next item. Here there is no delay required since this will invoked only when the transition of first word is completed
  }
  //Start animation process
  fadeIn();
}

// --------------------------------------------------------
const textNodes = [
  {
    id: 1,
    text:
      "pini tenpo pimeja ale musi e ni: sina lape pini insa tomo nasa. poka sina e ni: poki pi ko laso suli",
    options: [
      {
        text: "o tawa le ko - Take the goo",
        setState: { blueGoo: true },
        nextText: 2,
      },
      {
        text: "jaki! tawa ala! - Gross! Leave it!",
        nextText: 2,
      },
    ],
  },
  {
    id: 2,
    text:
      " Looking for answers, you wander around until you find a merchant rubbing his hands together. ",
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
      " After leaving the merchant you begin to feel tired. You find a small village in the shadow of a scary looking castle. ",
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
      " The castle has dozens of twisty passages all alike. You feel unexplainably tired. Finding a bed in one of the passages, you fall asleep. Unfortunately, you are killed by a terrible monster in your sleep. The good news is that you never felt a thing. ",
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
      " Without any money to rent a room, you break into an inn and fall asleep. After a few hours of sleep the owner of the inn finds you and has the town guard lock you in a cell where you are killed by a fellow prisoner. ",
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
      " You wake up well rested and full of energy ready to explore the nearby castle. ",
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
      " While exploring the castle you come across a horrible monster in your path. ",
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
      " Your attempts to run are in vain and the monster easily catches you and kills you ",
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
      " You foolishly thought this monster could be slain with a single sword. Bwahahahaha! He eats you. ",
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
      " The monster laughs as you hide behind your shield. He eats you, shield and all. ",
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
      " You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your own and live out the rest of your days there. ",
    options: [
      {
        text: "Congratulations. Play Again. ",
        nextText: -1,
      },
    ],
  },
];

// --------------------------------------------------------
startGame();
