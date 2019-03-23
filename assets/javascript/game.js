const gameBands = ["Poison","Metallica","Duran Duran","Motely Crue","Gun N Roses","Van Halen",
  "Def Leppard","Madonna","Prince","Queen","Bon Jovi"];

const imageBands = ["poison.jpg","metallica.jpg","duranduran.jpg","motley-crue.jpg",
"guns-n-roses.png","van-helan.jpg","defleppard.jpg","madonna.png","prince.jpg",
"queen.png","bonjovi.jpg"]


var randomWord;               // Random Band selected
var lcrandomWord;             // Set word to lower case
var underScore = [];          // Array to hold under scores
var wrongLetter = [];         // Array to hold the wrong guess
var letterGuessed = [];       // Letter guessed
var letterMatchedCtr = 0;     // Counter for letters that matched
var guessesLeftCtr = 12;      // Total # of guesses left...initialized to 12
var holdImageIndex = 0;       // Hold index of band selected
// var gameOver = false;         // 
// var winnerFlag = false;
// var letterAlreadyFound = false;
var bandImage;                // Variable to hold the band image location
var wrongKeyPressed = "Games Accepts only letters!!"
var exitMessage = "Game over!!"
var winMessage = "Winner...Press Restart-Game button to start a new game!!"

// Function
// Main function that starts the game
//  will select a band at random based on the # of bands in the array
//======================================================= 
function gameStart() {
  // Selects random word from array based on # of bands 
  randomWord = gameBands[Math.floor(Math.random() * gameBands.length)];
 
  // console.log(randomWord);

  // Set letters to lowercase
  lcrrandomWord = randomWord.toLowerCase();
  // Removes spaces
  lcrrandomWord = lcrrandomWord.replace(/\s+/g, '');

  console.log(lcrrandomWord);
  // console.log(lcrrandomWord.length);

  // hold the index of the band found to locate image based on band location
  holdImageIndex = gameBands.indexOf(randomWord);

  // console.log(holdImageIndex);

  // Call function to determine underScore based on words length
  generateUnderScore();

  //Reset 
  wrongLetter = [];               //Wrong letter selected array
  guessesLeftCtr = 12;            //Total # of letter to guess 
 
  //Print guesses left to page
  document.getElementById("guesses-left").textContent = guessesLeftCtr;
  // console.log("guessesLeftCtr "+guessesLeftCtr);
}

// Function
// On keyup function to capture keys being entered
//======================================================= 
document.onkeyup = function(event) {
  // capture key pressed
  letterGuessed = event.key;

  // console.log(winnerFlag);
  // if (winnerFlag) {
  //   alert("WINNER4444!")
  //   winnerFlag = false;
  //   resetGame();
  // }

  // blank out label at bottom of page
  document.getElementById("loser-Label").textContent = " ";

  // Capture key code to verify only letters are entered
  var key = event.keyCode;
  // valid letter codes
  if (key >= 65 && key <= 90)  {
     // console.log("letterGuessed "+letterGuessed);
    // console.log("randomWord.indexOf(letterGuessed) "+lcrrandomWord.indexOf(letterGuessed));
    
    // Checks to see if letter pressed is in the random word
    if (lcrrandomWord.indexOf(letterGuessed) > -1){
      // Loops thru random word based on it's length
      for (var i = 0;i < lcrrandomWord.length; i++){
        // Check to random word letter matches letter guessed
        if (lcrrandomWord[i] === letterGuessed){
          // Set UnderScore array with letter guessed
          underScore[i] = letterGuessed;
          // Update page with underscore and remove comma's
          document.getElementById("underScoreW").textContent = underScore.join(" ");

          console.log("underscore2 "+ underScore);
          // guessesLeftCtr--;
          // document.getElementById("guesses-left").textContent = guessesLeftCtr;

          // Call function to update counters and display # of guesses left
          updateWrongGuess();
          // Increment counter that letter matched
          letterMatchedCtr++;
          // Call Function to determine if is word has been guessed
          determineWinLose();
        }

      }
    } else {
      // Check to see if letter pressed has already been entered
      if (wrongLetter.indexOf(letterGuessed) > -1){
        } else {
          // Push wrong letter guessed to array
          wrongLetter.push(letterGuessed);
          // console.log("wrongLetter: " + wrongLetter);
          // Display wrong letter guessed to page
          document.getElementById("letters-guessed").textContent = wrongLetter;
          //Reset arrays
          updateWrongGuess();
          determineWinLose();
      }
    } 
  } else {
    // Update loser label at bottom of page
    document.getElementById("loser-Label").textContent = wrongKeyPressed;
  }
}


// Function
// Set the underscore based on random word length
//======================================================= 
function generateUnderScore() {
  // Loop thru random word and set the underscore based on the length
  for (var i = 0;i < lcrrandomWord.length; i++){
    underScore.push("_");
  }
  // Diplay on page
  document.getElementById("underScoreW").textContent = underScore.join(" ");
  console.log("UnderScore "+ underScore);

}

// Function
// Wrong letter was guess, decrement the # of possible guesses
//  display the count on page
//======================================================= 
function updateWrongGuess() {

  // Decrement letters left
  guessesLeftCtr--;
  // Display guesses left on page
  document.getElementById("guesses-left").textContent = guessesLeftCtr;
}

// Function - determines if the word has been guessed
//  Checks # of letters guessed against the length of random word
//  if they equal, user wins
//   a song from band displays at top
//   image of band displays on left
//   song displayed plays
function determineWinLose(){
  // alert("Check winner called")
  // Check letter guessed against random word length 
  if (letterMatchedCtr === lcrrandomWord.length) {
    // console.log("winnner");

    // Update page with song from band on top
    document.getElementById("winner-Label").textContent = randomWord;
    document.getElementById("loser-Label").textContent = winMessage;
    bandImage= "./assets/images/" + imageBands[holdImageIndex];
    console.log(bandImage);
    document.getElementById("band-image").setAttribute("src",bandImage);
    // setImage();
    // document.getElementById("band-image").innerHTML = "./assets/images/defleppard.jpg";
    // winnerFlag=true;
    // let i = 0;
    // setTimeout(() => alert("You have won...press Ok to reset game!"), 100); // 100000000
    // assume that the time to execute this function is >100ms
    // for(let j = 0; j < 100000000; j++) {
    //   i++;
    // }
    // resetGame();
  } // Check # of guesses left to see if they have any left
  else if(guessesLeftCtr === 0)
  {
    // Update page that they've lost at bottom
    // alert("lose");
    // if (confirm("Do you want to continue?")) {
    //   // Save it!
    //   alert("yes");
    // } else {
    //   // Do nothing!
    //   alert("no");
    // }
    
  // var answer = confirm("Save data?")
  // if (answer) {
  //   //some code
  //   alert("yes");
  // }
  // else {
  //   //some 
    // alert("no");
    document.getElementById("guesses-left").textContent = " ";
    document.getElementById("underScoreW").textContent = "____";
    document.getElementById("loser-Label").textContent = exitMessage;
    
  
    // wins = 0;
    // losses = 0;
    // clearArrays();
    // resetGame();
  } 
  if(guessesLeftCtr === 0) {
    let i = 0;
    setTimeout(() => alert("Maximum Number of 12 Guesses Met...game is resetting!"), 100); // 100000000
    // assume that the time to execute this function is >100ms
    for(let j = 0; j < 100000000; j++) {
      i++;
    }

        console.log("herewait");
    // alert();
    resetGame();
  }
}

function resetGame() {
  location.reload();
}

function setImage() {
    
  bandImage= "./assets/images/" + imageBands[holdImageIndex];
  console.log(bandImage);
  document.getElementById("band-image").setAttribute("src",bandImage);
}



gameStart();