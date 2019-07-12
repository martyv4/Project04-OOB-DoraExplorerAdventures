/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 /*
    Phrase.js - definition of the Phrase class
    - represents a phrase to be used in the Game class
    - constructor takes input of a single string, converts to lowercase, stores in property 'phrase'
    - class method 'addPhraseToDisplay()' updates the application DOM to show the class property phrase in the game board
    - class method 'checkLetter(letter)' determines whether an input letter 'letter' is in the phrase string
    - class method 'showMatchedLetter(letter)' will reveal on the DOM game board the specified letter 'letter'
*/

 class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

/**
* Display phrase on game board
*/
    addPhraseToDisplay() {
  // Use jQuery to create and add elements to the DOM https://www.w3schools.com/jquery/jquery_dom_add.asp
  //Generate a new div element and append to the element with the activities class
    const chars = this.phrase.split('');
    for (let index = 0; index < chars.length; index++) {
        const element = chars[index];
        const $phraseLtrListItem = $("<li></li>");   
        if (element == ' ' )
        { 
            $phraseLtrListItem.attr('class', 'space')
        }
        else
        {
            $phraseLtrListItem.attr('class', 'hide letter ' + element)
        }
        $phraseLtrListItem.text(element);
        $("#phrase ul").append($phraseLtrListItem);      //Append the new element
    }
   };
/**
    * Checks if passed letter is in phrase
    * @param (string) letter - Letter to check
    * 
*/
    checkLetter(letter) {
        return this.phrase.includes(letter);
};

/**
    * Displays passed letter on screen after a match is found
    * @param (string) letter - Letter to display
    * https://stackoverflow.com/questions/8249785/jquery-replace-one-class-with-another/8249801
*/
    showMatchedLetter(letter) {
        const $matched = $("#phrase li." + letter); //matching letters will have a class matching that letter
        for (let index = 0; index < $matched.length; index++) {
            const $element = $matched.eq(index);
            $element.addClass('show');
            $element.removeClass('hide');
        }

    };
}

 