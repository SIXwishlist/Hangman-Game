
var wins = 0; //number of won games
var wordBank = ["kyle", "lunch"]; //array containing all possible word choices for the user to guess against
console.log("First log")

var Hangman = {

    guessesLeft: 12, //number of wrong guesses before user loses
    currentWord: "", //string to contain the current word the user needs to guess
    guessedLetters: [], //array to contain previous wrong choices
    wordDisplay: "", //the display of the letters correctly guessed or yet to be guessed
    correctGuesses: 0,
    guessesNeeded: 0,

    //sets up the game area and resets all values to default
    prepGame: function() {
        console.log("game prep");
        let newWordChoice = Math.floor(Math.random() * wordBank.length);
        console.log(newWordChoice);
        this.currentWord = wordBank[newWordChoice];
        this.guessesNeeded = this.currentWord.length;
        this.guessesLeft = 12;
        this.guessedLetters = [];
        this.correctGuesses = 0;
        
        this.wordDisplay = "";
        for (i = 0; i < this.currentWord.length; i++) {
            this.wordDisplay += "_ ";
        }

        //calls functions to update displayed values on document
        this.updateWordHTML();
        this.updateGuessHTML();
        this.updateLettersHTML();
        this.updateWinsHTML();
    },

    //gets passed event.key of keyup function
    compareGuess: function(guess) {
        
        let userGuess = guess.toLowerCase();

        //checks if letter has been guessed already, then if its in the current word or not
        if (!this.guessedLetters.includes(userGuess)) {

            if (this.currentWord.includes(userGuess)) {
                this.guessedLetters.push(userGuess);
                this.updateLettersHTML();

                //checks how many times the correctly guessed letter is in the current word and increments the number of correct guesses
                for (let i = 0; i < this.currentWord.length; i ++) {
                    if (userGuess === this.currentWord.charAt(i)) {
                        this.correctGuesses++;
                        console.log(this.correctGuesses);
                    }
                }

                //code to update this.wordDisplay goes here

                window.setTimeout(this.checkGameStatus(), 500);

            } else {
                this.guessesLeft--
                this.updateGuessHTML();
                this.guessedLetters.push(userGuess);
                this.updateLettersHTML();
                this.checkGameStatus();
            }

        }
        
    },

    updateWordHTML: function() {
        document.getElementById('wordDisplay').textContent = this.wordDisplay;
    },

    updateGuessHTML: function() {
        document.getElementById('guesses').textContent = this.guessesLeft;
    },

    updateLettersHTML: function() {

        let guessedLetterOutput = "";

        for (let i = 0; i < this.guessedLetters.length; i ++) {
            guessedLetterOutput += this.guessedLetters[i] + " ";
        }
        document.getElementById('lettersGuessed').textContent = guessedLetterOutput;
    },

    updateWinsHTML: function() {
        document.getElementById('wins').textContent = "Wins: " + wins;
    },

    checkGameStatus() {
        console.log("check");
        if (this.guessesLeft === 0) {
            alert("You've lost. Try again?");
            this.prepGame();
        }

        if (this.correctGuesses === this.guessesNeeded && this.correctGuesses != 0) {
            alert("You've won! Another game?");
            this.prepGame();
        }

    }
};

window.onload = function(event) {
    console.log("Second log");
    Hangman.prepGame();
};

document.onkeyup = function(event) {
    Hangman.compareGuess(event.key);
};
