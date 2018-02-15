
var wins = 0; //number of won games
var wordBank = ["pain", "grenouille", "chat", "chien", "vache", "vin", "paris", "marseille", "bordeaux", "lyon",  //array containing all possible word choices for the user to guess against
                "lapin", "pomme", "nantes", "baguette", "fromage", "arbre", "cigarette", "tabac", "quotidienne", "fin"];
var marseillaise = new Audio("../Hangman-Game/assets/sounds/marsshort.mp3");                                                                 

var Hangman = {

    guessesLeft: 12, //number of wrong guesses before user loses
    currentWord: "", //string to contain the current word the user needs to guess
    guessedLetters: [], //array to contain previous wrong choices
    wordDisplay: [], //the display of the letters correctly guessed or yet to be guessed
    correctGuesses: 0,
    guessesNeeded: 0,

    //sets up the game area and resets all values to default
    prepGame: function() {
        console.log("game prep");
        let newWordChoice = Math.floor(Math.random() * wordBank.length);
        console.log(newWordChoice);
        Hangman.currentWord = wordBank[newWordChoice];
        Hangman.guessesNeeded = Hangman.currentWord.length;
        Hangman.guessesLeft = 12;
        Hangman.guessedLetters = [];
        Hangman.wordDisplay = [];
        Hangman.correctGuesses = 0;
        
        //converts word selected to underscores and spaces
        for (i = 0; i < Hangman.currentWord.length; i++) {
            Hangman.wordDisplay.push("_");
            Hangman.wordDisplay.push(" ");
        }

        //calls functions to update displayed values on document
        Hangman.updateWordHTML();
        Hangman.updateGuessHTML();
        Hangman.updateLettersHTML();
        Hangman.updateWinsHTML();
    },

    //gets passed event.key of keyup function
    compareGuess: function(guess) {
        
        let userGuess = guess.toLowerCase();
        console.log(userGuess.charCodeAt(0));
        //checks if letter has been guessed already, then if its in the current word or not
        if (!Hangman.guessedLetters.includes(userGuess) && (userGuess.charCodeAt(0) >= 97 && userGuess.charCodeAt(0) <= 122)) {

            if (Hangman.currentWord.includes(userGuess)) {
                Hangman.guessedLetters.push(userGuess);
                Hangman.updateLettersHTML();
                
                //checks how many times the correctly guessed letter is in the current word and increments the number of correct guesses
                for (let i = 0; i < Hangman.currentWord.length; i ++) {
                    if (userGuess === this.currentWord.charAt(i)) {
                        Hangman.correctGuesses++;
                        
                        //getes the proper index in the array that is displayed to the player and replaces underscore with guessed letter
                        if (i != 0) {
                            let displayIndex = i * 2;
                            Hangman.wordDisplay[displayIndex] = Hangman.currentWord[i];
                            Hangman.updateWordHTML();
                        } else {
                            Hangman.wordDisplay[0] = Hangman.currentWord[i];
                            Hangman.updateWordHTML();
                        }
                        
                    }
                }

                Hangman.checkGameStatus();

            //if guess was not correct, decrements remaining guesses and adds incorrect letter to array of previous guesses
            } else {
                Hangman.guessesLeft--
                Hangman.updateGuessHTML();
                Hangman.guessedLetters.push(userGuess);
                Hangman.updateLettersHTML();
                Hangman.checkGameStatus();
            }

        }
        
    },

    //updates game HTML to show current state of word to be guessed against
    updateWordHTML: function() {

        document.getElementById('wordDisplay').textContent = " ";
        Hangman.wordDisplay.forEach(function(element) {
            document.getElementById('wordDisplay').textContent += element;
        });

    },

    //updates game HTML to show how many guesses remain
    updateGuessHTML: function() {

        document.getElementById('guesses').textContent = Hangman.guessesLeft;
    },

    //updates game HTML to show which letters have already been guessed
    updateLettersHTML: function() {

        let guessedLetterOutput = "";

        for (let i = 0; i < Hangman.guessedLetters.length; i ++) {
            guessedLetterOutput += Hangman.guessedLetters[i] + " ";
        }
        document.getElementById('lettersGuessed').textContent = guessedLetterOutput;
    },

    //updates game HTML to show how many wins player has achieved on current run
    updateWinsHTML: function() {
        document.getElementById('wins').textContent = "Wins: " + wins;
    },

    //called after game has finished processing user guess, checks if player has run out of guesses or gotten all letters correct
    checkGameStatus() {
        
        if (Hangman.guessesLeft === 0) {
            let playAgain = false;
            playAgain = setTimeout(Hangman.playAgainLoss, 500);
            if (playAgain) {
                setTimeout(Hangman.prepGame, 1000);
            }
        }

        if (Hangman.correctGuesses === Hangman.guessesNeeded && Hangman.correctGuesses != 0) {
            console.log("win check");
            wins++;
            let playAgain = false;
            playAgain = setTimeout(Hangman.playAgainWin, 500);
            console.log(playAgain);
            if (playAgain) {
                console.log("should start again");
                setTimeout(Hangman.prepGame, 1000);
            }
        }

    },

    //functions necessary to avoid setTimeout weirdness and to ensure game doesn't restart too quickly
    playAgainWin() {
        marseillaise.play();
        alert("Vous avez gagné! Encore?");
        return true;
    },

    playAgainLoss() {
        alert("Vous avez perdu! Essayez encore.");
        return true;
    }
};

window.onload = function(event) {
    Hangman.prepGame();
};

document.onkeypress = function(event) {
    Hangman.compareGuess(event.key);
};
