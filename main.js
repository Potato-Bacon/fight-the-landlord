import $ from "jquery";

console.log($);

// program to shuffle the deck of cards

// declare card elements
let deck = [
  { Value: "Ace", Suit: "Spades" },
  { Value: "2", Suit: "Spades" },
  { Value: "3", Suit: "Spades" },
  { Value: "4", Suit: "Spades" },
  { Value: "5", Suit: "Spades" },
  { Value: "6", Suit: "Spades" },
  { Value: "7", Suit: "Spades" },
  { Value: "8", Suit: "Spades" },
  { Value: "9", Suit: "Spades" },
  { Value: "10", Suit: "Spades" },
  { Value: "Jack", Suit: "Spades" },
  { Value: "Queen", Suit: "Spades" },
  { Value: "King", Suit: "Spades" },
  { Value: "Ace", Suit: "Diamonds" },
  { Value: "2", Suit: "Diamonds" },
  { Value: "3", Suit: "Diamonds" },
  { Value: "4", Suit: "Diamonds" },
  { Value: "5", Suit: "Diamonds" },
  { Value: "6", Suit: "Diamonds" },
  { Value: "7", Suit: "Diamonds" },
  { Value: "8", Suit: "Diamonds" },
  { Value: "9", Suit: "Diamonds" },
  { Value: "10", Suit: "Diamonds" },
  { Value: "Jack", Suit: "Diamonds" },
  { Value: "Queen", Suit: "Diamonds" },
  { Value: "King", Suit: "Diamonds" },
  { Value: "Ace", Suit: "Club" },
  { Value: "2", Suit: "Club" },
  { Value: "3", Suit: "Club" },
  { Value: "4", Suit: "Club" },
  { Value: "5", Suit: "Club" },
  { Value: "6", Suit: "Club" },
  { Value: "7", Suit: "Club" },
  { Value: "8", Suit: "Club" },
  { Value: "9", Suit: "Club" },
  { Value: "10", Suit: "Club" },
  { Value: "Jack", Suit: "Club" },
  { Value: "Queen", Suit: "Club" },
  { Value: "King", Suit: "Club" },
  { Value: "Ace", Suit: "Heart" },
  { Value: "2", Suit: "Heart" },
  { Value: "3", Suit: "Heart" },
  { Value: "4", Suit: "Heart" },
  { Value: "5", Suit: "Heart" },
  { Value: "6", Suit: "Heart" },
  { Value: "7", Suit: "Heart" },
  { Value: "8", Suit: "Heart" },
  { Value: "9", Suit: "Heart" },
  { Value: "10", Suit: "Heart" },
  { Value: "Jack", Suit: "Heart" },
  { Value: "Queen", Suit: "Heart" },
  { Value: "King", Suit: "Heart" },
  { Value: "Joker", Suit: "Black" },
  { Value: "Joker", Suit: "Red" },
];

//shuffle of cards
const shuffle = () => {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
};

console.log("The first five cards are:");

// display 5 results
for (let i = 0; i < 5; i++) {
  console.log(`${deck[i].Value} of ${deck[i].Suit}`);
}

console.log(deck);
