/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

 /*
  2019/07/07 - YM
  Comments in method stubs from project documentation were left in place
  These adhere to JSDoc specfications
  https://en.wikipedia.org/wiki/JSDoc


    app.js - the main JS for the OOP Game App.
     - declare global variable 'game'
     - when the start button is clicked, assign to it an instance of the Game class, call methods
        resetGameBoard() and startGame()
     - assign every 'qwerty button' an event listener for clicking on each button
  */ 



$(document).ready(() => {

  let game;
  //<button id="btn__reset">Start Game</button>
  //the startGame() button will initiate the game once its clicked
  $("#btn__reset").click(() => {
    openingTheme.pause();
    openingTheme.currentTime = 0;
    if (game != null) {
      game.stopAllSounds();
    }
    game = new Game();
    game.resetGameBoard();
    game.startGame();
  });

  //the qwerty button will initiate on the click of the DOM keyboard
  $("#qwerty button").click((e) => {
    const $target = $(e.target); //button that was clicked
    game.handleInteraction($target);
  });

  const openingTheme = new Audio("sounds/Dora_the_Explorer.mp3");

  openingTheme.loop = true;
  const playPromise = openingTheme.play();

  if (playPromise !== undefined) {
    playPromise.then(_ => {
      openingTheme.play();
    })
    .catch(error => {
    });
  }

});

//These were used for testing purposes
/*  const phrase = new Phrase();
    const game = new Game(); */ 

/*     const phrase = new Phrase('Life is like a box of chocolates');
    console.log(`Phrase - phrase: ${phrase.phrase}`); */
    
/*     const game = new Game();
    game.phrases.forEach((phrase, index) => {
    console.log(`Phrase ${index} - phrase: ${phrase.phrase}`);
    });
  */   
/*  const logPhrase = (phrase) => {
  console.log(`Phrase - phrase: `, phrase.phrase);
  };
  const game = new Game();
  logPhrase(game.getRandomPhrase());
  logPhrase(game.getRandomPhrase());
  logPhrase(game.getRandomPhrase());
  logPhrase(game.getRandomPhrase());
  logPhrase(game.getRandomPhrase()); */

 /*  const game = new Game();
  game.getRandomPhrase().addPhraseToDisplay();
 */
