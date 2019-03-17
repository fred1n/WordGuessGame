// Word Guess Game
// Hangman game using a list of bands from the 80's.  Here are the parameters:
// 1. Game starts by pressing any key
// 2.   Displays the # of letters by showing an underscore for the letter count
// 3.   Indicates the # of possible guesses
// 4.   Has image of a Hangman Game
// 5.   Has a list of bands from the 80's...list has 10 bands
// 6.   As a key is pressed, the # of possible guesses is decreased
// 7.   If the guess was correct, the letter replaces the underscore
// 8.   If an incorrect guess is made, the letter is also displayed

//Global variables 
//=======================================================
const gameBands = ["one","two","three"];
// Array of words
// const gameBands = ["PinkFloyd","VanHalen","BonJovi","Metallica","DuranDuran"];

var randomBand;               // Random Band selected
var lcrandomBand;             // Set word to lower case
var underScore = [];          // Array to hold under scores
var wrongLetter = [];         // Array to hold the wrong guess
var letterGuessed = [];       // Letter guessed
var winCounter = 0;           // Counter for # of wins 
var guessesLeftCtr = 12;        // Total # of guess


// Function
// Main function that starts the game
//=======================================================   
function startGame()
  {
    // Selects random word from array based on # of bands 
    randomBand = gameBands[Math.floor(Math.random() * gameBands.length)];
    // Set letters to lowercase
    lcrandomBand = randomBand.toLowerCase();
    // Temp
    console.log("lcrandomBand "+lcrandomBand);

    // Call function to determine underScore based on words length
    generateUnderScore();

    
    // document.onkeyup = function(event)
    // {
    //   
    //   letterGuessed = event.key;
    //   // Temp
    //   console.log("key entered: "+letterGuessed);
    // }

  // Function to capture user input based on OnKeyUp event
  document.onkeyup = function(event)
  {
    // Set keyed char to var
    letterGuessed = event.key;
    // Use indexof to determine if letter entered matches letter in random word
    if(randomBand.indexOf(letterGuessed) > -1)
    {
     // Decrement guesses left
     guessesLeftCtr--;
     // Display counter on page
     document.getElementById("guesses-left").textContent = guessesLeftCtr;
     // Loop word to determine letters location
     for(var i = 0;i < randomBand.length; i++)
     { // Check letters in word again letter guessed
       if(randomBand[i] === letterGuessed)
       { // Set letter to Underscore array
         underScore[i] = letterGuessed;
         // Display on page using Join method to join array of letters into
         //  variable and space in quotes to remove comma's
         document.getElementById("underScoreW").textContent = underScore.join(" ");
         // Increment win counter
         winCounter++;
         winLose();
        // window.alert("Won-Done");
       }
     }
    } 
    else
    { //add wrong letters guessed to array decrement letter left
      wrongLetter.push(letterGuessed);
      guessesLeftCtr--;

      //Update page counter and letters guessed so far
      document.getElementById("guesses-left").textContent = guessesLeftCtr;
      document.getElementById("letters-guessed").textContent = wrongLetter;
      winLose();
      // window.alert("Loss-Done");
    }
  }
}

function winLose(){
  
  if(winCounter === randomBand.length)
  {
  console.log("WinLose Function");
  document.getElementById("winner-Label").textContent = randomBand;
  
  console.log("WinLose Function");

  // window.alert("Done");
  // alert ("won");
  // wins = 0;
  // losses = 0;
  // clearArrays();
  // startGame();
  }
  else if(guessesLeftCtr === 0)
  {
    alert("lose");
    // wins = 0;
    // losses = 0;
    // clearArrays();
    // startGame();
  } 
}


//Create underscore based on random word selected
function generateUnderScore() 
  {
    //Based on band,determine length of underscore
    for(var i = 0;i < randomBand.length; i++)
    {
        underScore.push("_");
    }
    console.log("underScored Word+Length "+randomBand.length+" "+underScore);

    //Print underscore to page
    document.getElementById("underScoreW").textContent = underScore.join(" ");

    //reset counters 
    wrongLetter = [];
    guessesLeftCtr = 12;

    //Print guesses left to page
    document.getElementById("guesses-left").textContent = guessesLeftCtr;
  }



  startGame();