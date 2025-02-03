// initial score at start
let score = 0;

// references 
const gameStatusEl = document.querySelector('[data-testid="gameStatus"]');
const scoreEl = document.querySelector('[data-testid="score"]');
const targetBox = document.querySelector('[data-testid="colorBox"]');
const colorOptionEls = document.querySelectorAll('[data-testid="colorOption"]');
const newGameButton = document.querySelector('[data-testid="newGameButton"]');

// Function to generate a random hex color string
function generateRandomColor() {
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += '0123456789ABCDEF'[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to generate unique random colors; returns an array
function generateColorOptions(numOptions) {
  const options = new Set();
  while (options.size < numOptions) {
    options.add(generateRandomColor());
  }
  return Array.from(options);
}

// Variables to hold the target color and our options
let targetColor = "";
let options = [];

// Main function to initialize or reset the game
function initGame() {
   // return player score to zero
   
  // Clear any previous messages
  gameStatusEl.textContent = "";

  // Generate the target color
  targetColor = generateRandomColor();

  // Generate 5 extra random colors and add target to options
  options = generateColorOptions(5);
  options.push(targetColor);

  // Shuffle the options array so target is in a random spot
  options.sort(() => Math.random() - 0.5);

  // Update the target color box with the target color
  targetBox.style.backgroundColor = targetColor;

  // Loop through each color button and assign a color from our options array
  colorOptionEls.forEach((button, index) => {
    // Assign the background color
    button.style.backgroundColor = options[index];
    // Set up click event handler for each button
    button.onclick = () => {
      const chosenColor = options[index];
      if (chosenColor === targetColor) {
        gameStatusEl.textContent = "Correct!";
        score++;
        scoreEl.textContent = "Score: " + score;
        // After a correct guess, wait 1 second and reset the game
        setTimeout(() => {
          initGame();
        }, 1000);
      } else {
        gameStatusEl.textContent = "Wrong! Try again!";
      }
    };
  });
}

// New Game button resets the game
newGameButton.addEventListener("click", initGame);

// Initialize the game on page load
initGame();


