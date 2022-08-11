import $ from "jquery";

// declare card elements
let deck = [
  { Value: "14", Suit: "Spades" },
  { Value: "15", Suit: "Spades" },
  { Value: "3", Suit: "Spades" },
  { Value: "4", Suit: "Spades" },
  { Value: "5", Suit: "Spades" },
  { Value: "6", Suit: "Spades" },
  { Value: "7", Suit: "Spades" },
  { Value: "8", Suit: "Spades" },
  { Value: "9", Suit: "Spades" },
  { Value: "10", Suit: "Spades" },
  { Value: "11", Suit: "Spades" },
  { Value: "12", Suit: "Spades" },
  { Value: "13", Suit: "Spades" },
  { Value: "14", Suit: "Diamonds" },
  { Value: "15", Suit: "Diamonds" },
  { Value: "3", Suit: "Diamonds" },
  { Value: "4", Suit: "Diamonds" },
  { Value: "5", Suit: "Diamonds" },
  { Value: "6", Suit: "Diamonds" },
  { Value: "7", Suit: "Diamonds" },
  { Value: "8", Suit: "Diamonds" },
  { Value: "9", Suit: "Diamonds" },
  { Value: "10", Suit: "Diamonds" },
  { Value: "11", Suit: "Diamonds" },
  { Value: "12", Suit: "Diamonds" },
  { Value: "13", Suit: "Diamonds" },
  { Value: "14", Suit: "Club" },
  { Value: "15", Suit: "Club" },
  { Value: "3", Suit: "Club" },
  { Value: "4", Suit: "Club" },
  { Value: "5", Suit: "Club" },
  { Value: "6", Suit: "Club" },
  { Value: "7", Suit: "Club" },
  { Value: "8", Suit: "Club" },
  { Value: "9", Suit: "Club" },
  { Value: "10", Suit: "Club" },
  { Value: "11", Suit: "Club" },
  { Value: "12", Suit: "Club" },
  { Value: "13", Suit: "Club" },
  { Value: "14", Suit: "Heart" },
  { Value: "15", Suit: "Heart" },
  { Value: "3", Suit: "Heart" },
  { Value: "4", Suit: "Heart" },
  { Value: "5", Suit: "Heart" },
  { Value: "6", Suit: "Heart" },
  { Value: "7", Suit: "Heart" },
  { Value: "8", Suit: "Heart" },
  { Value: "9", Suit: "Heart" },
  { Value: "10", Suit: "Heart" },
  { Value: "11", Suit: "Heart" },
  { Value: "12", Suit: "Heart" },
  { Value: "13", Suit: "Heart" },
  { Value: "16", Suit: "Black" },
  { Value: "16", Suit: "Red" },
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
  currentbidder: 0,
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

//push card from deck to landlord(bonus cards for landlordplayer for winning bidder)
const deckToLandlord = () => {
  let $dealtCard = deck.shift();
  game.landlordcards.push($dealtCard);

  let $card = $("<div>")
    .addClass("landlordback")
    .attr("id", $dealtCard.Suit + $dealtCard.Value)
    .attr("value", $dealtCard.Value);
  $(".landlord").append($card);
};

//function for deal all cards
const deckToHand = (index) => {
  let $dealtCard = deck.shift();
  game.players[index].hand.push($dealtCard);
  let $player = index + 1;
  let $card = null;
  if (game.turn === index) {
    $card = $("<div>")
      .addClass("P" + $player + "front")

      .attr("id", $dealtCard.Suit + $dealtCard.Value)
      .attr("value", $dealtCard.Value);
    $("#hand" + $player).append($card);
  } else {
    $card = $("<div>")
      .addClass("P" + $player + "back")
      .attr("id", $dealtCard.Suit + $dealtCard.Value)
      .attr("value", $dealtCard.Value);
    $("#hand" + $player).append($card);
  }

  $card.attr("player", index);

  $card.on("click", (event) => {
    let cardPlayerID = Number($card.attr("player"));
    if (game.turn === cardPlayerID) {
      $(event.currentTarget).toggleClass("shiftup");
    }

    if ($(event.currentTarget).hasClass("shiftup") === true) {
      comboCheck.push($(".shiftup").attr("value"));
    } else {
      comboCheck.pop();
    }

    console.log($(".shiftup").length, "length");
    console.log(comboCheck, "comboCheck array");
    comboCheck.sort((a, b) => a - b);
    console.log(comboCheck, "sorted");
  });
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
  const $pass = $("<button>").text("pass").addClass("biddingphase");
  $(".message").append($bidOne);
  $(".message").append($bidTwo);
  $(".message").append($bidThree);
  $(".message").append($pass);

  let count = 1;

  $bidOne.on("click", () => {
    if (game.turn === 0) changeBidder();
    $bidOne.hide();
    count++;
    $("#turn").text(count);
  });

  $bidTwo.on("click", () => {
    $bidOne.hide();
    $bidTwo.hide();
    count++;
    $("#turn").text(count);
    changeBidder();
  });

  $bidThree.on("click", () => {
    $(".landlordback").on("click", (event) => {
      $(event.currentTarget).toggleClass("shiftup");

      if ($(event.currentTarget).hasClass("shiftup") === true) {
        comboCheck.push($(".shiftup").attr("value"));
      } else {
        comboCheck.pop();
      }
      console.log(comboCheck, "sorted");
    });
    $(".landlordback").removeClass("landlordback").addClass("P1front");
    $("#hand1").append($(".P1front"));

    game.players[0].hand.push(game.landlordcards.shift());
    game.players[0].hand.push(game.landlordcards.shift());
    game.players[0].hand.push(game.landlordcards.shift());
  });

  $pass.on("click", () => {
    changeBidder();
    count++;
    $("#turn").text(count);
  });
};
const changeBidder = () => {
  if (game.currentbidder === "P1") {
    game.currentbidder = "P2";
    console.log(game.currentbidder, "current bidder");
  } else if (game.currentbidder === "P2") {
    game.currentbidder = "P3";
    console.log(game.currentbidder, "current bidder");
  }
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
let currentCardValue = 0;
let numCardsInPlay = 0;

//check for singlecard
$("#play").on("click", () => {
  if (
    $(".shiftup").length === 1 &&
    numCardsInPlay < $(".shiftup").length &&
    currentCardValue < comboCheck[0]
  ) {
    $(".playarea").append($(".shiftup"));
    $(".P1front").removeClass("shiftup");
    comboCheck = [];
    const playerOneHandCards = $("div#hand1>div.P1front");
    playerOneHandCards.addClass("P1back");
    $(".P2back");
  }
});

//check for pairs
$("#play").on("click", () => {
  let isEqual = allNumbersEqual(comboCheck);
  if ($(".shiftup").length === 2 && isEqual) {
    $(".playarea").append($(".shiftup"));
    $(".P1front").removeClass("shiftup");
    comboCheck = [];
    const playerOneHandCards = $("div#hand1>div.P1front");
    playerOneHandCards.addClass("P1back");
  }
});

//check for straights
$("#play").on("click", () => {
  for (let index = 0; index < comboCheck.length; index++) {
    if (
      comboCheck[index + 1] - comboCheck[index] === 1 &&
      comboCheck.length >= 5
    ) {
      $(".playarea").append($(".shiftup"));
      $(".P1front").removeClass("shiftup");
      comboCheck = [];
      const playerOneHandCards = $("div#hand1>div.P1front");
      playerOneHandCards.addClass("P1back");
    }
  }
});

//check for triplets
$("#play").on("click", () => {
  let x = allNumbersEqual(comboCheck);
  if ($(".shiftup").length === 3 && isEqual) {
    $(".playarea").append($(".shiftup"));
    $(".P1front").removeClass("shiftup");
    comboCheck = [];
    const playerOneHandCards = $("div#hand1>div.P1front");
    playerOneHandCards.addClass("P1back");
  }
});

//check for bomb
$("#play").on("click", () => {
  let isEqual = allNumbersEqual(comboCheck);
  if ($(".shiftup").length === 4 && isEqual) {
    $(".playarea").append($(".shiftup"));
    $(".P1front").removeClass("shiftup");
    comboCheck = [];
    const playerOneHandCards = $("div#hand1>div.P1front");
    playerOneHandCards.addClass("P1back");
  }
});

//check for rocket
$("#play").on("click", () => {
  if (
    $(".shiftup").length === 2 &&
    $(".shiftup").eq(0).attr("value") === "16" &&
    $(".shiftup").eq(1).attr("value") === "16"
  ) {
    $(".playarea").append($(".shiftup"));
    $(".P1front").removeClass("shiftup");
    comboCheck = [];
    const playerOneHandCards = $("div#hand1>div.P1front");
    playerOneHandCards.addClass("P1back");
  }
});

//check for fullhouse

$("#play").on("click", () => {
  // console.log(comboCheck.slice(0, 3));
  let isTriple = sliceCardsTriple();
  console.log(isTriple, "testtriple");
  let isPair = sliceCardsPair();

  if ($(".shiftup").length === 5 && isTriple && isPair) {
    $(".playarea").append($(".shiftup"));
    $(".P1front").removeClass("shiftup");
    comboCheck = [];
    const playerOneHandCards = $("div#hand1>div.P1front");
    playerOneHandCards.addClass("P1back");
  }
});

const sliceCardsPair = () => {
  if (allNumbersEqual(comboCheck.slice(0, 2))) {
    console.log(comboCheck.slice(0, 2));
    return comboCheck.slice(0, 2);
  } else if (allNumbersEqual(comboCheck.slice(3))) {
    console.log(comboCheck.slice(3));
    return comboCheck.slice(3);
  }
};

const sliceCardsTriple = () => {
  if (allNumbersEqual(comboCheck.slice(0, 3))) {
    console.log(comboCheck.slice(0, 3));
    return comboCheck.slice(0, 3);
  } else if (allNumbersEqual(comboCheck.slice(2))) {
    console.log(comboCheck.slice(2));
    return comboCheck.slice(2);
  }
};
