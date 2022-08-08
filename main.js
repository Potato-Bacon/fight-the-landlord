import $ from "jquery";

// program to shuffle the deck of cards

// declare card elements
let deck = [
  { Value: "A", Suit: "Spades" },
  { Value: "2", Suit: "Spades" },
  { Value: "3", Suit: "Spades" },
  { Value: "4", Suit: "Spades" },
  { Value: "5", Suit: "Spades" },
  { Value: "6", Suit: "Spades" },
  { Value: "7", Suit: "Spades" },
  { Value: "8", Suit: "Spades" },
  { Value: "9", Suit: "Spades" },
  { Value: "10", Suit: "Spades" },
  { Value: "J", Suit: "Spades" },
  { Value: "Q", Suit: "Spades" },
  { Value: "K", Suit: "Spades" },
  { Value: "A", Suit: "Diamonds" },
  { Value: "2", Suit: "Diamonds" },
  { Value: "3", Suit: "Diamonds" },
  { Value: "4", Suit: "Diamonds" },
  { Value: "5", Suit: "Diamonds" },
  { Value: "6", Suit: "Diamonds" },
  { Value: "7", Suit: "Diamonds" },
  { Value: "8", Suit: "Diamonds" },
  { Value: "9", Suit: "Diamonds" },
  { Value: "10", Suit: "Diamonds" },
  { Value: "J", Suit: "Diamonds" },
  { Value: "Q", Suit: "Diamonds" },
  { Value: "K", Suit: "Diamonds" },
  { Value: "A", Suit: "Club" },
  { Value: "2", Suit: "Club" },
  { Value: "3", Suit: "Club" },
  { Value: "4", Suit: "Club" },
  { Value: "5", Suit: "Club" },
  { Value: "6", Suit: "Club" },
  { Value: "7", Suit: "Club" },
  { Value: "8", Suit: "Club" },
  { Value: "9", Suit: "Club" },
  { Value: "10", Suit: "Club" },
  { Value: "J", Suit: "Club" },
  { Value: "Q", Suit: "Club" },
  { Value: "K", Suit: "Club" },
  { Value: "A", Suit: "Heart" },
  { Value: "2", Suit: "Heart" },
  { Value: "3", Suit: "Heart" },
  { Value: "4", Suit: "Heart" },
  { Value: "5", Suit: "Heart" },
  { Value: "6", Suit: "Heart" },
  { Value: "7", Suit: "Heart" },
  { Value: "8", Suit: "Heart" },
  { Value: "9", Suit: "Heart" },
  { Value: "10", Suit: "Heart" },
  { Value: "J", Suit: "Heart" },
  { Value: "Q", Suit: "Heart" },
  { Value: "K", Suit: "Heart" },
  { Value: "Joker", Suit: "Black" },
  { Value: "Joker", Suit: "Red" },
];

let players = [
  { name: "P1", hand: [] },
  { name: "P2", hand: [] },
  { name: "P3", hand: [] },
];

let landlordCards = [];

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
console.log(deck);

// deal cards to players

console.log(deck[0]);

const deal = () => {
  let bonusCards = deck.pop();
  landlordCards.push(bonusCards);
  bonusCards = deck.pop();
  landlordCards.push(bonusCards);
  bonusCards = deck.pop();
  landlordCards.push(bonusCards);
  // console.log(deck, "51");
  // console.log(landlordCards, "landlord");

  for (let cards = 0; cards - 14 < deck.length; cards++) {
    for (let dealt = 0; dealt < players.length; dealt++) {
      players[dealt].hand.push(deck[0]);
      deck.shift();
      console.log(deck.length);
    }
  }
};

deal();
console.log(players[0]);
console.log(players[1]);
console.log(players[2]);

console.log(landlordCards);
