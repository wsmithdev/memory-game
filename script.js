

const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

let card1 = null;
let card2 = null;
let clicks = 0;

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked

  clicks++;
  document.querySelector("#clicks").innerText = clicks;

  if (canClick()) {
    flipCard(event);
  } else {
    flipToStartPos();
    flipCard(event);
  }

  // Check if cards are a match
  isMatch();

  // Check if game is over
  gameOver();
}

// when the DOM loads
createDivsForColors(shuffledColors);
document.querySelector("#new-game-btn").addEventListener("click", () => {
  location.reload()
  
});

// Check how many cards are flipped
const canClick = () => {
  let flippedCards = document.querySelectorAll(".flipped");
  if (flippedCards.length < 2) {
    return true;
  } else return false;
};

// Flip cards to starting position
const flipToStartPos = () => {
  let flippedCards = document.querySelectorAll(".flipped");

  for (flippedCard of flippedCards) {
    flippedCard.classList.remove("flipped");
    flippedCard.style.backgroundColor = "";
  }

  card1 = null;
  card2 = null;
};

// Flip card function
const flipCard = (event) => {
  const cardClicked = event.target;
  cardClicked.style.backgroundColor = cardClicked.classList[0];
  cardClicked.classList.add("flipped");

  if (card1 === null) {
    card1 = cardClicked;
  } else {
    card2 = cardClicked;
  }
};

// Check if cards are a match
const isMatch = () => {
  if (card1.style.backgroundColor === card2.style.backgroundColor) {
    let matchedCards = document.querySelectorAll(
      `.${card1.style.backgroundColor}`
    );

    for (matchedCard of matchedCards) {
      // matchedCard.classList.remove(`${card1.style.backgroundColor}`)
      matchedCard.className = "matched";
      // matchedCard.classList.add("matched")
      matchedCard.removeEventListener("click", handleCardClick);
      matchedCard.style.backgroundColor = "rgba(0,0,0,0.25)";
    }
  }
};

// Check if game is over
const gameOver = () => {
  let cards = document.querySelectorAll(".matched");

  if (cards.length === 10){
    alert(`Game over, your score is ${clicks}`)
  }
}
