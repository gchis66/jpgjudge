let images = [];
let currentImageIndex = null;

// Fetch and display a random image
async function fetchAndDisplayImage() {
  const response = await fetch("/imgs.json");
  images = await response.json();
  displayRandomImage();
}

function displayRandomImage() {
  currentImageIndex = Math.floor(Math.random() * images.length);
  const image = images[currentImageIndex];
  document.getElementById(
    "app"
  ).innerHTML = `<img src="${image.url}" alt="Random Image">`;
}

function handleGuess(isAIGuess) {
  const streakCounter = document.getElementById("count");
  const currentImage = images[currentImageIndex];
  if (isAIGuess === currentImage.isAI) {
    streakCounter.innerText = parseInt(streakCounter.innerText) + 1;
  } else {
    // Incorrect guess logic
    streakCounter.innerText = 0;
  }
  displayRandomImage();
}

document
  .querySelector(".circle-button.red")
  .addEventListener("click", () => handleGuess(true));
document
  .querySelector(".circle-button.green")
  .addEventListener("click", () => handleGuess(false));

// Initial image fetch
fetchAndDisplayImage();
