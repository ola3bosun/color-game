 // score variable (initial score)
 let score = 0;

 // References to DOM elements
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

 // Function to generate unique random colors - output returns an array
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

 // Function for starting a new round (does not reset the score - reset function is at bottom due to initial bug)
 function newRound() {
   // Clear any previous messages
   gameStatusEl.textContent = "";

   // Generate the target color
   targetColor = generateRandomColor();

   // Generate 5 extra random colors and add target to options
   options = generateColorOptions(5);
   options.push(targetColor);

   // Shuffle the options array so the target is in a random spot
   options.sort(() => Math.random() - 0.5);

   // Update the target color box with the target color
   targetBox.style.backgroundColor = targetColor;

   // Loop through each color button and assign a color from the options array
   colorOptionEls.forEach((button, index) => {
     button.style.backgroundColor = options[index];
     button.onclick = () => {
       const chosenColor = options[index];
       if (chosenColor === targetColor) {
         gameStatusEl.textContent = "You too sabi!";
         score++;
         scoreEl.textContent = "Score: " + score;
         // After a correct guess, chill for 1 second before starting a new round
         setTimeout(newRound, 1000);
       } else {
         gameStatusEl.textContent = "Wrong! Try again!";
       }
     };
   });
 }

 // Function to start a new game (resets score)
 function initGame() {
   score = 0;
   scoreEl.textContent = "Score: " + score;
   newRound();
 }

 // New Game button resets the entire game (score included)
 newGameButton.addEventListener("click", initGame);

 // Initialize the game on page load
 initGame();
