// Setup array of bands
const gameBands = [
	'Poison',
	'Metallica',
	'Duran Duran',
	'Motely Crue',
	'Gun N Roses',
	'Van Halen',
	'Def Leppard',
	'Madonna',
	'Prince',
	'Queen',
	'Bon Jovi'
];
// Setup array of band images
const imageBands = [
	'poison.jpg',
	'metallica.jpg',
	'duranduran.jpg',
	'motley-crue.jpg',
	'guns-n-roses.png',
	'van-halen.jpg',
	'defleppard.jpg',
	'madonna.png',
	'prince.jpg',
	'queen.png',
	'bonjovi.jpg'
];

// Declare Global variables
var randomWord; // Random Band selected
var lcrandomWord; // Set word to lower case
var underScore = []; // Array to hold under scores
var wrongLetter = []; // Array to hold the wrong guess
var letterGuessed = []; // Letter guessed
var letterMatchedCtr = 0; // Counter for letters that matched
var guessesLeftCtr = 12; // Total # of guesses left...initialized to 12
var holdImageIndex = 0; // Hold index of band selected
var bandImage; // Variable to hold the band image location
var gameCompleteFlg = false; // Boolean to determine whether is game is over Won/Lost
var wrongKeyPressed = 'Games Accepts only letters!!';
var exitMessage = 'Game over!!';
var winMessage = 'Winner...Press Restart-Game button to start a new game!!';
var loserMessage = 'Maximum Number of 12 Guesses Met...game is resetting!';

// Function
// Main function that starts the game
//  will select a band at random based on the # of bands in the array
//=======================================================
function gameStart() {
	// Selects random word from array based on # of bands
	randomWord = gameBands[Math.floor(Math.random() * gameBands.length)];

	// Set letters to lowercase
	lcrrandomWord = randomWord.toLowerCase();
	// Removes spaces
	lcrrandomWord = lcrrandomWord.replace(/\s+/g, '');

	console.log(lcrrandomWord);

	// hold the index of the band found to locate image based on band location
	holdImageIndex = gameBands.indexOf(randomWord);

	// Call function to determine underScore based on words length
	generateUnderScore();

	//Reset
	wrongLetter = []; //Wrong letter selected array
	guessesLeftCtr = 12; //Total # of letter to guess

	//Print guesses left to page
	document.getElementById('guesses-left').textContent = guessesLeftCtr;
}

// Function
// On keyup function to capture keys being entered
//=======================================================
document.onkeyup = function(event) {
	// capture key pressed
	letterGuessed = event.key;

	// Check booleon flag if true, reset game since the user has won
	if (gameCompleteFlg === true) {
		// display alert that the game is resetting after a win
		alert('Game resetting after a win!!');
		// call function to reset game
		resetGame();
	}

	// blank out label at bottom of page
	document.getElementById('loser-Label').textContent = ' ';

	// Capture key code to verify only letters are entered
	var key = event.keyCode;
	// valid letter codes
	if (key >= 65 && key <= 90) {
		// Checks to see if letter pressed is in the random word
		if (lcrrandomWord.indexOf(letterGuessed) > -1) {
			// Loops thru random word based on it's length
			for (var i = 0; i < lcrrandomWord.length; i++) {
				// Check to random word letter matches letter guessed
				if (lcrrandomWord[i] === letterGuessed) {
					// Set UnderScore array with letter guessed
					underScore[i] = letterGuessed;
					// Update page with underscore and remove comma's
					document.getElementById('underScoreW').textContent = underScore.join(' ');
					// Display to log
					console.log('underscore2 ' + underScore);

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
			if (wrongLetter.indexOf(letterGuessed) > -1) {
			} else {
				// Push wrong letter guessed to array
				wrongLetter.push(letterGuessed);
				// Display wrong letter guessed to page
				document.getElementById('letters-guessed').textContent = wrongLetter;
				//Reset arrays
				updateWrongGuess();
				determineWinLose();
			}
		}
	} else {
		// Update loser label at bottom of page
		document.getElementById('loser-Label').textContent = wrongKeyPressed;
	}
};

// Function
// Set the underscore based on random word length
//=======================================================
function generateUnderScore() {
	// Loop thru random word and set the underscore based on the length
	for (var i = 0; i < lcrrandomWord.length; i++) {
		// Push underscore to array
		underScore.push('_');
	}
	// Display on page
	document.getElementById('underScoreW').textContent = underScore.join(' ');
	// Display word being guessed on console
	console.log('UnderScore ' + underScore);
}

// Function
// Wrong letter was guessed, decrement the # of possible guesses
//  display the count on page
//=======================================================
function updateWrongGuess() {
	// Decrement letters left
	guessesLeftCtr--;
	// Display guesses left on page
	document.getElementById('guesses-left').textContent = guessesLeftCtr;
}

// Function - determines if the word has been guessed
//  Checks # of letters guessed against the length of random word
//  if they equal, user wins
//   a song from band displays at top
//   image of band displays on left
//   song displayed plays
function determineWinLose() {
	// alert("Check winner called")
	// Check letter guessed against random word length
	if (letterMatchedCtr === lcrrandomWord.length) {
		// Update page with song from band on top
		document.getElementById('winner-Label').textContent = randomWord;
		// Update message on bottom of page to indicate a win
		document.getElementById('loser-Label').textContent = winMessage;

		// Function set new image on page
		setImage();
	} else if (guessesLeftCtr === 0) {
		// Check # of guesses left to see if they have any left
		// Update page
		//  clear # of guesses
		//  reset underscore on page
		//  display update message to exit game
		document.getElementById('guesses-left').textContent = ' ';
		document.getElementById('underScoreW').textContent = '____';
		document.getElementById('loser-Label').textContent = exitMessage;
	} // Check to see if total # of guess has been reached
	if (guessesLeftCtr === 0) {
		// display alert message on page
		alert(loserMessage);

		// Reset game
		resetGame();
	}
}

// Function - ResetGame
//  Calls reload function to reset game
function resetGame() {
	location.reload();
}

// Function - SetImage
//  set image to variable
//  prepare image to display on page
function setImage() {
	// Set image details to variable
	bandImage = './assets/images/' + imageBands[holdImageIndex];
	// Update image on page
	document.getElementById('band-image').setAttribute('src', bandImage);

	// Boolean indicator to be check later that game is over either user won or lost
	gameCompleteFlg = true;
}

// Function - GameStart
//  Main function to start that starts the game
gameStart();
