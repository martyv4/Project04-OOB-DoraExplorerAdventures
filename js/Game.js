/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
 /*
 

/*7/8/2019: YM:
    Game.js - definition of the Game class
    - constructor takes no parameters; established three properties:
        * missed is an integer set to 0
        * phrases is assigned to the result of a class method createPhrases()
        * activePhrase begins set to null (no instance of Phrase)
        Additional properties were added to retain sounds in Audio class instances
    - There are ten class methods:
        - createPhrases() will generate an array of five Phrase class instances
        - getRandomPhrase() will choose a random Phrase instance among those in this.phrases
        - startGame() will hide the overlay in the DOM, revealing the game properties, choose a random
            phrase, populate the game board with it (via Phrase method addPhraseToDisplay()), and adds
            the key listener events to the entire page to react to key events (keyboard presses)
            - the event listener finds the corresponding button that would've been pressed in the DOM,
                passes this to the handleInteraction(button) method
        - handleInteraction(button) takes in a variable representing the button clicked in the DOM.
            The text from the button is extracted, and the Phrase is searched for any matches for this
            letter, and the Phrase class method showMatchedLetter(letterChosen) is called if so.
            If there is no match, a life is removed by calling this.removeLife(). Success or failure
            will play a sound.

        - stopSound(sound) takes in an instance of Audio. If this sound is playing, stop it. This is
        called before playing any sound to ensure no multiples are played.

        - playSound(sound) takes in an instance of Audio. The sound file in that Audio is played.

        - resetGameBoard() will remove clases from DOM elements that would be added over the course
            of game events, effectively resetting the DOM to the starting state. This is called whenever
            additional games are played.

        - removeLife() will increment class property this.missed by one, and its value is checked.
            If it is 4, blink the remaining heart via CSS. If it is 5, the game is over, and actions
            are taken accordingly.
        - gameOver(isGameWon) takes a boolean parameter which is true if the player won, false if not
            Actions are taken accordingly: show the properly overlay color and message, and play a sound
            Remove the key press listeners at this point, so the player cannot use these before starting
            a new game.

        - checkForWin() checks the game board for victory by seeing if there remains any hidden letters
            (any items which have class 'hidden'). If the count is 0, the player has won, otherwise
            return false (game has not ended)
*/
class Game {
    constructor() {
        //set the missed property to 0
        this.missed = 0;
        //Option#1 - and then set the `phrases` property to call that method.
        this.phrases = this.createPhrases();
        //set a property with the value null       
        this.activePhrase = null;

        this.badSound = [new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/bad.mp3"), new Audio("sounds/OH%20MAN.mp3")];
        this.goodSound = new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/goodbell.mp3");
        this.loseSound = new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/lose.mp3");
        this.winSound = new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/win.mp3");
    }

    stopSound(sound) {
        sound.pause();
        sound.currentTime = 0;
    }
    
    playSound(sound) {
        sound.play();
    }

    stopAllSounds() {
        this.stopSound(this.loseSound);
        this.stopSound(this.winSound);
    }

/*2019/07/07: YM
 
*/
//Create a method named createPhrases() with 5 phrases
    createPhrases() {
        let phrasesList = [];
        let newPhraseOne = new Phrase('Yippee');
        phrasesList.push(newPhraseOne);
        let newPhraseTwo = new Phrase('Hola');
        phrasesList.push(newPhraseTwo);
        let newPhraseThree = new Phrase('No problem');
        phrasesList.push(newPhraseThree);
        let newPhraseFour = new Phrase('Adios');
        phrasesList.push(newPhraseFour);
        let newPhraseFive = new Phrase('Chocolate');
        phrasesList.push(newPhraseFive);
        return phrasesList;
    }
/*
        * Selects random phrase from phrases property
        @return {Object} Phrase object chosen to be used
*/
    getRandomPhrase()
    {
        // generates random number between 0 and this.phrases.length - 1
        const randomNumber = Math.floor(Math.random() * this.phrases.length);
        // return the object in this.phrases at position randomNumber
        return this.phrases[randomNumber];
    }    
/*
    Begins game by selecting a random phrase and displaying it to user
*/
    startGame() {

        $('#overlay').hide();
        this.activePhrase=this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();

        //listen for keyup on the entire page content 'body'
        $("body").on('keyup', (e) => {
            if (e.which !== 0) {
                const charTyped = String.fromCharCode(e.which).toLowerCase();
                if (charTyped.match(/[a-zA-Z]/)) { //only react to alphabetic characters
                    const $correspondingButton = $('#qwerty button:contains("' + charTyped +'")');
                    if (!$correspondingButton.prop('disabled'))
                    {
                        //pass the button into handleInteraction, only if it isn't disabled
                        //preventing multiple guesses for the same button/letter
                        this.handleInteraction($correspondingButton);
                    }
                }
            }
        });
    }

    /**
* Handles onscreen keyboard button clicks
* @param (HTMLButtonElement) button - The clicked button element
*/
handleInteraction(button) {
    button.prop('disabled', true);
    const letterChosen = button.text();
    if (this.activePhrase.checkLetter(letterChosen))
    {
        button.addClass('chosen');
        this.activePhrase.showMatchedLetter(letterChosen);
        
        if (this.checkForWin())
        {
            this.stopSound(this.winSound);
            this.playSound(this.winSound);
            const $lastHeart = $('#scoreboard li').first();
            $lastHeart.removeClass('blink-image');
            this.gameOver(true);
        }
        else
        {
            this.stopSound(this.goodSound);
            this.playSound(this.goodSound);
        }
    }
    else
    {
        button.addClass('wrong');
        this.removeLife();
    }
    
    };

/**
* Checks for winning move
* @return {boolean} True if game has been won, false if game wasn't
    won
*/
    checkForWin() {
        const $hidden = $("#phrase li.hide");
        if ($hidden.length == 0)
        {
            return true;
        }
            return false;
    };

/**
    * Increases the value of the missed property
    * Removes a life from the scoreboard
    * Checks if player has remaining lives and ends game if player is out
   <li class="tries"><img src="images/liveHeart.png" alt="Heart Icon" height="35" width="30"></li>

*/
    removeLife() {
        this.missed = this.missed + 1;
        const lostHeartLoc = "images/lostHeart.png";

        //the next heart to be changed will be the last one which isn't already in class lost
        const $availHeart = $('#scoreboard li:not(.lost)').last();

        const $availHeartImg = $availHeart.find('img');
        $availHeartImg.attr('src', lostHeartLoc);
        $availHeart.addClass('lost');
 
        if (this.missed == 4)
        {
            const $lastHeart = $('#scoreboard li:not(.lost)').first();
            $lastHeart.addClass('blink-image');
        }
        
        if (this.missed >= 5) //using >= 5 prevents not ending the game if a player somehow ends up with > 5 guesses
        {
            const $lastHeart = $('#scoreboard li').first();
            $lastHeart.removeClass('blink-image');
            this.stopSound(this.loseSound);
            this.playSound(this.loseSound);
            this.gameOver(false);
        }
        else
        {
            //choose random 'missed guess' sound
            const randomNumber = Math.floor(Math.random() * this.badSound.length);
            this.stopSound(this.badSound[randomNumber]);
            this.playSound(this.badSound[randomNumber]);
        }
    };
/**
    * Displays game over message
    * @param {boolean} gameWon - Whether or not the user won the game
        <h1 id="game-over-message"></h1>
 */
    gameOver(isGameWon) {
        const $overlay = $('#overlay');
        $overlay.show();
        if (isGameWon){
        $('#game-over-message').text("You Won");
        $overlay.removeClass('start');
        $overlay.addClass('win');
        }
        else {
        $('#game-over-message').text("Sorry try again");
        $overlay.removeClass('start');
        $overlay.addClass('lose');
        }

        $("body").off('keyup');
    };

    /**
* Resets game board to start a new game
* 
*/
    resetGameBoard() {
        //clear all phrase letter panels
        $('#phrase ul').empty();
        //reset DOM keyboard
        const $allButtons = $("#qwerty button");
        $allButtons.prop('disabled', false);
        $allButtons.removeClass('chosen');
        $allButtons.removeClass('wrong');

        //set hearts back to 5 full
        const liveHeartLoc = "images/liveHeart.png";
        const $allHearts = $('#scoreboard li');
        $allHearts.find('img').attr('src', liveHeartLoc);
        $allHearts.removeClass('lost');

        //reset overlay back to neutral state (so the proper class alone - win or loss - will
        //be there at the end of the next game)
        $('#overlay').removeClass('lose');
        $('#overlay').removeClass('win');
    }
}


