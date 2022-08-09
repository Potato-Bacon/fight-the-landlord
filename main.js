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
  turn: "P1",
  landlordplayer: "P1",
  bidpoints: "3",
  multiplier: "1",
  players: [
    { name: "P1", hand: [] },
    { name: "P2", hand: [] },
    { name: "P3", hand: [] },
  ],
  landlordcards: [],
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

shuffle();

// deal cards to players

const deal = () => {
  let bonusCards = deck.pop();
  game.landlordcards.push(bonusCards);
  bonusCards = deck.pop();
  game.landlordcards.push(bonusCards);
  bonusCards = deck.pop();
  game.landlordcards.push(bonusCards);

  for (let cards = 0; cards - 14 < deck.length; cards++) {
    for (let dealt = 0; dealt < game.players.length; dealt++) {
      game.players[dealt].hand.push(deck[0]);
      deck.shift();
    }
  }
};

deal();
console.log(game.players[0]);
console.log(game.players[1]);
console.log(game.players[2]);

console.log(game.landlordcards);

//displaying cards for players hand
const playerOne = game.players[0].hand;
const playerTwo = game.players[1].hand;
const playerThree = game.players[2].hand;
const dealtCards = () => {
  for (const card of playerOne) {
    let $card = $("<div>")
      .addClass("P1front")
      .addClass("P1")
      .attr("id", card.Suit + card.Value);
    $("#hand1").append($card);
  }

  for (const card of playerTwo) {
    let $card = $("<div>")
      .addClass("P2back")
      .addClass("P2")
      .attr("id", card.Suit + card.Value);
    $("#hand2").append($card);
  }

  for (const card of playerThree) {
    let $card = $("<div>")
      .addClass("P3back")
      .addClass("P3")
      .attr("id", card.Suit + card.Value);

    $("#hand3").append($card);
  }

  for (const card of game.landlordcards) {
    let $card = $("<div>")
      .addClass("landlordback")
      .attr("id", card.Suit + card.Value);
    $(".landlord").append($card);
  }
};

dealtCards();

const $bidOne = $("<button>").text(1).addClass("biddingphase");
const $bidTwo = $("<button>").text(2).addClass("biddingphase");
const $bidThree = $("<button>").text(3).addClass("biddingphase");
const $pass = $("<button>").text("pass").addClass("biddingphase");

// const changeTurn = () => {
//   $(".biddingphase").on("click", () => {
//     if (game.turn === "P1") {
//       game.turn = "P2";
//     }
//     if (game.turn === "P2") {
//       game.turn = "P3";
//     } else {
//       game.turn = "P1";
//     }
//     console.log(game.turn);
//   });
// };
const biddingPhase = () => {
  $(".message").append($bidOne);
  $(".message").append($bidTwo);
  $(".message").append($bidThree);
  $(".message").append($pass);

  let count = 1;

  $bidOne.on("click", () => {
    $bidOne.hide();
    count++;
    $("#turn").text(count);
    // changeTurn();
  });

  $bidTwo.on("click", () => {
    $bidOne.hide();
    $bidTwo.hide();
    count++;
    $("#turn").text(count);
    // changeTurn();
  });

  $bidThree.on("click", () => {
    $(".landlordback").removeClass("landlordback").addClass("P1front");
    $("#hand1").append($(".P1front"));

    // changeTurn();
  });

  $pass.on("click", () => {
    count++;
    $("#turn").text(count);
    // changeTurn();
  });
};

$(".P1front").on("click", (event) => {
  $(event.currentTarget).toggleClass("shiftup");
});

$("#play").on("click", () => {
  $(".playarea").append($(".shiftup"));
  $(".P1").removeClass("P1front").addClass("P1back");
});

biddingPhase();
