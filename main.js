import $ from "jquery";

// declare card elements
let deck = [
  { Value: 14, Suit: "Spades" },
  { Value: 15, Suit: "Spades" },
  { Value: 3, Suit: "Spades" },
  { Value: 4, Suit: "Spades" },
  { Value: 5, Suit: "Spades" },
  { Value: 6, Suit: "Spades" },
  { Value: 7, Suit: "Spades" },
  { Value: 8, Suit: "Spades" },
  { Value: 9, Suit: "Spades" },
  { Value: 10, Suit: "Spades" },
  { Value: 11, Suit: "Spades" },
  { Value: 12, Suit: "Spades" },
  { Value: 13, Suit: "Spades" },
  { Value: 14, Suit: "Diamonds" },
  { Value: 15, Suit: "Diamonds" },
  { Value: 3, Suit: "Diamonds" },
  { Value: 4, Suit: "Diamonds" },
  { Value: 5, Suit: "Diamonds" },
  { Value: 6, Suit: "Diamonds" },
  { Value: 7, Suit: "Diamonds" },
  { Value: 8, Suit: "Diamonds" },
  { Value: 9, Suit: "Diamonds" },
  { Value: 10, Suit: "Diamonds" },
  { Value: 11, Suit: "Diamonds" },
  { Value: 12, Suit: "Diamonds" },
  { Value: 13, Suit: "Diamonds" },
  { Value: 14, Suit: "Club" },
  { Value: 15, Suit: "Club" },
  { Value: 3, Suit: "Club" },
  { Value: 4, Suit: "Club" },
  { Value: 5, Suit: "Club" },
  { Value: 6, Suit: "Club" },
  { Value: 7, Suit: "Club" },
  { Value: 8, Suit: "Club" },
  { Value: 9, Suit: "Club" },
  { Value: 10, Suit: "Club" },
  { Value: 11, Suit: "Club" },
  { Value: 12, Suit: "Club" },
  { Value: 13, Suit: "Club" },
  { Value: 14, Suit: "Heart" },
  { Value: 15, Suit: "Heart" },
  { Value: 3, Suit: "Heart" },
  { Value: 4, Suit: "Heart" },
  { Value: 5, Suit: "Heart" },
  { Value: 6, Suit: "Heart" },
  { Value: 7, Suit: "Heart" },
  { Value: 8, Suit: "Heart" },
  { Value: 9, Suit: "Heart" },
  { Value: 10, Suit: "Heart" },
  { Value: 11, Suit: "Heart" },
  { Value: 12, Suit: "Heart" },
  { Value: 13, Suit: "Heart" },
  { Value: 16, Suit: "Black" },
  { Value: 17, Suit: "Red" },
];

// number of players

//placeholder for bonus card which will be given to landlord player after bidding phase

const game = {
  players: [
    { name: "P1", hand: [] },
    { name: "P2", hand: [] },
    { name: "P3", hand: [] },
  ],
  landlordcards: [],
  turn: 0,
  currentwinningbid: 0,
  landlordplayer: 0,
  bidpoints: 0,
  multiplier: 0,
};

//shuffle of cards
const shuffle = () => {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
};

const addOnClickEvent = ($card) => {
  $card.on("click", (event) => {
    let cardPlayerID = Number($card.attr("player"));
    if (game.turn === cardPlayerID) {
      $(event.currentTarget).toggleClass("shiftup");
    }

    if ($(event.currentTarget).hasClass("shiftup") === true) {
      comboCheck.push(Number($card.attr("Value")));
    } else {
      comboCheck.pop();
    }
    console.log(comboCheck, "comboCheck array");
    comboCheck.sort((a, b) => a - b);
    console.log(comboCheck, "sorted");
  });
};
//push card from deck to landlord(bonus cards for landlordplayer for winning bidder)
const deckToLandlord = () => {
  let $dealtCard = deck.shift();
  game.landlordcards.push($dealtCard);

  let $card = $("<div>")
    .addClass("landlordback")
    .attr("id", $dealtCard.Suit + $dealtCard.Value)
    .attr("value", $dealtCard.Value);
  $(".landlord").append($card);

  addOnClickEvent($card);
};

//function for deal all cards
const deckToHand = (index) => {
  let $dealtCard = deck.shift();
  game.players[index].hand.push($dealtCard);
  let $player = index + 1;
  let $card = null;
  $card = $("<div>")
    .addClass("P" + $player + "back")
    .addClass("P" + $player + "front")
    .attr("player", index)
    .attr("id", $dealtCard.Suit + $dealtCard.Value)
    .attr("value", $dealtCard.Value);
  $("#hand" + $player).append($card);

  if (game.turn === index) {
    $card.toggleClass("P" + $player + "back");
  }

  addOnClickEvent($card);
};
shuffle();

// deal cards to players

const deal = () => {
  deckToLandlord();
  deckToLandlord();
  deckToLandlord();

  while (deck.length !== 0) {
    for (let playerid = 0; playerid < game.players.length; playerid++) {
      if (deck.length !== 0) {
        deckToHand(playerid);
      }
    }
  }
};

deal();

const biddingPhase = () => {
  const $bidOne = $("<button>").text(1).addClass("biddingphase");
  const $bidTwo = $("<button>").text(2).addClass("biddingphase");
  const $bidThree = $("<button>").text(3).addClass("biddingphase");
  $(".message").append($bidOne);
  $(".message").append($bidTwo);
  $(".message").append($bidThree);

  $bidOne.on("click", () => {
    $("#bidpoints").text(1);
    $bidOne.hide();
    changeTurn(game.turn);
  });

  $bidTwo.on("click", () => {
    $("#bidpoints").text(2);
    $bidOne.hide();
    $bidTwo.hide();
    changeTurn(game.turn);
  });

  $bidThree.on("click", () => {
    $("#bidpoints").text(3);
    $bidOne.hide();
    $bidTwo.hide();
    $bidThree.hide();
    let playerID = game.turn + 1;
    let index = game.turn;
    $(".landlordback")
      .removeClass("landlordback")
      .addClass("P" + playerID + "front")
      .attr("player", index);
    $("#hand" + playerID).append($(".P" + playerID + "front"));
    $("#landlordplayer").text(playerID);

    game.players[game.turn].hand.push(game.landlordcards.shift());
    game.players[game.turn].hand.push(game.landlordcards.shift());
    game.players[game.turn].hand.push(game.landlordcards.shift());
    $(".P" + index + "front").replaceWith(sortCardsValue());
  });
};

const sortCardsValue = () => {
  let index = game.turn + 1;

  $(".P" + index + "front")
    .toArray()
    .sort((a, b) => {
      let $aVal = parseInt($(a).attr("value"));
      let $bVal = parseInt($(b).attr("value"));
      return $aVal - $bVal;
    });
};

let comboCheck = [];

biddingPhase();

const allNumbersEqual = (arr) => {
  return arr.every((element) => {
    if (element === arr[0]) {
      // console.log("true");
      return true;
    } else {
      // console.log("false");
      return false;
    }
  });
};

const changeTurn = (index) => {
  game.turn = (game.turn + 1) % 3;

  let playerid = index + 1;
  $("#turn").text(game.turn + 1);
  $(".shiftup")
    .addClass("playareafront")
    .removeClass("P" + playerid + "front")
    .removeClass("P" + playerid + "back")
    .removeClass("shiftup");
  checkWinCondition();

  let nextPlayerID = game.turn + 1;

  $(".P" + playerid + "front").addClass("P" + playerid + "back");
  $(".P" + nextPlayerID + "front").removeClass("P" + nextPlayerID + "back");
};
let passClickCount = 0;

$("#pass").on("click", () => {
  passClickCount++;
  changeTurn(game.turn);
  if (passClickCount >= 2) {
    currentHighestCardValue = 0;
    numCardsInPlay = 1;
    passClickCount = 0;
    $(".playareafront").remove();
  }
});

let currentHighestCardValue = 0;
let numCardsInPlay = 1;

//check for singlecard
$("#play").on("click", () => {
  if (
    $(".shiftup").length === 1 &&
    numCardsInPlay === $(".shiftup").length &&
    comboCheck[0] > currentHighestCardValue
  ) {
    numCardsInPlay = $(".shiftup").length;
    currentHighestCardValue = comboCheck[0];
    $(".playarea").append($(".shiftup"));
    changeTurn(game.turn);
    comboCheck = [];
  }
});

//check for pairs
$("#play").on("click", () => {
  let isEqual = allNumbersEqual(comboCheck);
  if (
    $(".shiftup").length === 2 &&
    isEqual &&
    comboCheck[0] > currentHighestCardValue &&
    $(".shiftup").eq(0).attr("value") !== "16"
  ) {
    numCardsInPlay = $(".shiftup").length;
    currentHighestCardValue = comboCheck[0];
    $(".playarea").append($(".shiftup"));
    changeTurn(game.turn);
    comboCheck = [];
    // $(".P1front").removeClass("shiftup");
    // comboCheck = [];
    // const playerOneHandCards = $("div#hand1>div.P1front");
    // playerOneHandCards.addClass("P1back");
    // $(".P2back").toggleClass("P2front").toggleClass("P2back");
  }
});

//check for straights
$("#play").on("click", () => {
  largestNumber(comboCheck);

  for (let index = 0; index < comboCheck.length; index++) {
    let difference = comboCheck[index + 1] - comboCheck[index];
    if (
      $(".shiftup").length === 5 &&
      difference === 1 &&
      num > currentHighestCardValue
    ) {
      // comboCheck.slice(-1) > currentHighestCardValue
      numCardsInPlay = $(".shiftup").length;
      currentHighestCardValue = num;
      $(".playarea").append($(".shiftup"));
      changeTurn(game.turn);
      comboCheck = [];
    }
  }
});

//check for triplets
$("#play").on("click", () => {
  let isEqual = allNumbersEqual(comboCheck);
  if (
    $(".shiftup").length === 3 &&
    isEqual &&
    comboCheck[0] > currentHighestCardValue
  ) {
    numCardsInPlay = $(".shiftup").length;
    currentHighestCardValue = comboCheck[0];
    $(".playarea").append($(".shiftup"));
    changeTurn(game.turn);
    comboCheck = [];
  }
});

let multiplier = 1;

//check for bomb
$("#play").on("click", () => {
  let isEqual = allNumbersEqual(comboCheck);
  if (
    $(".shiftup").length === 4 &&
    isEqual &&
    comboCheck[0] > currentHighestCardValue
  ) {
    numCardsInPlay = $(".shiftup").length;
    currentHighestCardValue = comboCheck[0];
    $(".playarea").append($(".shiftup"));
    multiplier = multiplier * 2;
    console.log(multiplier, "hi");
    $("#multiplier").text(multiplier);
    changeTurn(game.turn);
    comboCheck = [];
  }
});

//check for rocket
$("#play").on("click", () => {
  if (
    $(".shiftup").length === 2 &&
    $(".shiftup").eq(0).attr("value") === "16" &&
    $(".shiftup").eq(1).attr("value") === "17"
  ) {
    numCardsInPlay = $(".shiftup").length;
    currentHighestCardValue = comboCheck[1];
    $(".playarea").append($(".shiftup"));
    multiplier = multiplier * 2;
    $("#multiplier").text(multiplier);
    changeTurn(game.turn);
    comboCheck = [];
  }
});

//check for fullhouse

$("#play").on("click", () => {
  // console.log(comboCheck.slice(0, 3));
  let isTriple = sliceCardsTriple();
  let isPair = sliceCardsPair();

  if ($(".shiftup").length === 5 && isTriple && isPair) {
    $(".playarea").append($(".shiftup"));
    changeTurn(game.turn);
    comboCheck = [];
  }
});

//function to check if array is pairs for fullhouse cards
const sliceCardsPair = () => {
  if (allNumbersEqual(comboCheck.slice(0, 2))) {
    console.log(comboCheck.slice(0, 2));
    return comboCheck.slice(0, 2);
  } else if (allNumbersEqual(comboCheck.slice(3))) {
    console.log(comboCheck.slice(3));
    return comboCheck.slice(3);
  }
};
//function to check if array is triplets for fullhouse cards
const sliceCardsTriple = () => {
  if (allNumbersEqual(comboCheck.slice(0, 3))) {
    console.log(comboCheck.slice(0, 3));
    return comboCheck.slice(0, 3);
  } else if (allNumbersEqual(comboCheck.slice(2))) {
    console.log(comboCheck.slice(2));
    return comboCheck.slice(2);
  }
};

//check for 3 of a kind sequence
// 6 cards minimally
// at least 2 triplets in sequence
// 6, 9, 12

$("#play").on("click", () => {
  let isEqual = allNumbersEqual(comboCheck);

  if (
    $(".shiftup").length === 6 ||
    $(".shiftup").length === 9 ||
    $(".shiftup").length === 12
  ) {
    if (isEqual && comboCheck[0] > currentHighestCardValue) {
      numCardsInPlay = $(".shiftup").length;
      currentHighestCardValue = comboCheck[0];
      $(".playarea").append($(".shiftup"));
      changeTurn(game.turn);
      comboCheck = [];
    }
  }
});
let num = 0;

//function for largest number
const largestNumber = (arr) => {
  arr.forEach((element) => {
    if (num < element) {
      num = element;
    }
  });
};

//pseudo code for 3 of a kind sequence for equal numbers
// [3,3,3,4,4,4] (slice(0,3))  (slice(-3))
// [4,4,4,5,5,5,6,6,6] (slice(0,3)) (slice(3,6)) (slice(-3))
// [5,5,5,6,6,6,7,7,7,8,8,8] (slice(0,3)) (slice(3,6))  (slice(6,9)) (slice(-3))

//check for win condition

const checkWinCondition = () => {
  let index = game.turn + 1;
  if ($(".P" + index + "front").length === 0) {
    console.log("You win");
  }
};
