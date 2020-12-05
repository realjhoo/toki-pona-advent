// testing version alpha
import { textNodes } from "./GameStrings.js";
("use strict");
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

  // have client synthisizer read toki pona text
  // sayIt(textElement.innerText);

  // typing effect
  typeit();

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
function typeit() {
  // this is in jquery. refactor as vanilla?
  var words, $el;
  var arrEl = [];

  // loop through each div and populate the array with the container (div) element and its text content split
  $(".example").each(function () {
    var $this = $(this);
    arrEl.push({ el: $this, words: $.trim($this.text()).split(" ") });
    $this.empty();
  });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - -
  function fadeIn() {
    var len = arrEl.length,
      obj = arrEl.shift() || {}; //get the top item from array and remove it from the array using array.shift
    $el = obj.el; //get the container from the item
    words = obj.words; //get the array of words
    //if there are any items in the array start the animation process for this item.
    if (len) window.setTimeout(transitionElement, 0);
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - -
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

  // - - - - - - - - - - - - - - - - - - - - - - - - - - -
  function showWord(span) {
    span.appendTo($el).fadeIn(1000, transitionElement); // append the span to the container with an animation duration of 500ms and in the complete callback of this invoke transitionElement to process the next word or next item. Here there is no delay required since this will invoked only when the transition of first word is completed
  }
  //Start animation process
  fadeIn();
}

// --------------------------------------------------------
startGame();
