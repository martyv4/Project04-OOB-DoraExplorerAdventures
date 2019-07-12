
# Project-4-OOB-Game-Ver01

## Dora's Word Game Adventures 

### Game Objective: 
```
The game's objective is to guess the correct word.
 ```
### Instructions: 
 ```  
  1. On the start page click Start Game to begin.
  2. The game board page will appear.
  3. Click/Select any letter on the page or type a letter on the keyboard.
  4. If the letter is in the phrase every instance of it will be displayed in the top panel. If it is not in the phrase, the player will lose a life.
  5. The player wins when all letters in the phrase have been revealed. The player loses if all five lives are lost (five incorrect gueses).
  6. From either the 'win' or 'loss' screen, the player may begin a new game by selecting Start Game.
``` 
 ### Tools/Languages Used: 
```
    -- Javascript and jQuery 
    -- HTML/CSS 
```
## Game Features: 
Several additions were made to the original code base made avaialble for producing this application.

#### Start Screen
```
Functionality:
 * View the game title
 * Start Buttton to begin game
Additions Made:
-- CSS
 * Start Button color change
 * Start Button style changes: transition and :hover changes
-- Other Media
 * Header title changed to "Dora's Word Game Adventures"
 * Background image added
```
#### Game Screen
```
Functionality:
 * Game title header text
 * Game board - clickable letters
 * Game board - phrase display (all letters begin hidden)
 * Game board - life counter (five hearts)
 * Event listener for keyboard keypresses [alphabetic characters only]
Additions Made:
-- CSS
 * Keyboard Button color change
 * Keyboard Button style changes: transition and :hover changes
 * Background color and game board phrase changes
 * When the player has one heart left, it will fade and re-appear in loop
-- Other Media
 * Added sounds for correct and incorrect letter guesses
 * Added background image
```
#### Win Screen: 
```
Functionality:
 * Display 'win' message to the player
 * Provide Start Button to begin a new game
Additions Made:
-- CSS
 * Start Button color change
 * Start Button style changes: transition and :hover changes
-- Other Media
 * Sound added when reaching this page
 * Background image added
 ```
#### Lose Screen:
```
Functionality:
 * Display 'loss' message to the player
 * Provide Start Button to begin a new game
Additions Made:
-- CSS
 * Start Button color change
 * Start Button style changes: transition and :hover changes
-- Other Media
 * Sound added when reaching this page
 * Background image added
 ```