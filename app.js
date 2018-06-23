/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as they wish. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- A player losses entire scores & round score if they rolls two 6 in row. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- In Input Field, the player set the winning score - Game cannot start without setting the winning score
- Once the winning score set, the winning score cannot be changed either
  * They complete the game
    OR
  * Click the new game button
- The first player to reach winning scores on GLOBAL score wins the game
*/

// GLOBAL VARIABLES
let scores, roundScore, activePlayer, previousDice, winningScore;
// STATE VARIABLES
let holdAndDice,firstRoll;

// DOM BUTTON
const BTNROLL = document.querySelector('.btn-roll');
const BTNHOLD = document.querySelector('.btn-hold');
const BTNNEWGAME = document.querySelector('.btn-new');
// DOM ELEMENT
const TARGETSCORE = document.querySelector('.targetScore');
const DICE = document.querySelector('.dice');
const PANEL0 = document.querySelector('.player-0-panel');
const PANEL1 = document.querySelector('.player-1-panel');
const NAME0 = document.querySelector('#name-0');
const NAME1 = document.querySelector('#name-1');


// START A NEW GAME WHEN PAGE LOADED
newGame();

// ROLL DICE BUTTON
BTNROLL.addEventListener("click", function(){
    //Set Target score for winning
    winningScore = TARGETSCORE.value;
    //Check whether dice can be rolled
    if (winningScore !== "" && firstRoll) {
        firstRoll = false;
        BTNHOLD.removeAttribute('disabled');
        rollTheDice();
        TARGETSCORE.setAttribute('disabled',true);
    } else if (winningScore === "" && firstRoll) {
        alert('Please enter target score to start the game!');
    } else {
        rollTheDice();
    }
});

// HOLD BUTTON
BTNHOLD.addEventListener("click", function(){
    //If current score is 0
    if (roundScore === 0) {
        alert(`Your round sore is 0. There is nothing to hold! It is next player's turn. Please roll the dice!`);
    } else {
        holdAndDice ? holdScores() : alert('You have already clicked Hold button. Please Roll the Dice!');
    }
});

// NEW GAME BUTTON
BTNNEWGAME.addEventListener("click", newGame);


// ROLL THE DICE FUNCTION
function rollTheDice() {
    //Generate Random Number
    let dice = Math.round(Math.random()*5)+1;

    //Display the Dice image of random Number
    DICE.style.display = 'block';
    DICE.setAttribute('src', `dice-${dice}.png`);

    //Update the round score if the rolled number is NOT 1 OR Not consecutive 6
    let current = document.querySelector(`#current-${activePlayer}`);
    if(previousDice === 6 && dice ===6) {
        scores[activePlayer] = 0;
        roundScore = 0;
        document.querySelector(`#score-${activePlayer}`).textContent = '0';
        nextPlayer();

    } else if(dice!==1){
        roundScore+=dice;
        previousDice = dice;
    } else {
        previousDice = 0;
        nextPlayer()
    }
    current.innerHTML = roundScore;
    holdAndDice = true;
}

// HOLD SCORE FUNCTION
function holdScores () {

    //Add Current score to Global Score
    scores[activePlayer] += roundScore;

    //Update UI
    let playerScore = document.querySelector(`#score-${activePlayer}`);
    playerScore.innerHTML = scores[activePlayer];

    //check if player won the game
    if (scores[activePlayer] >= winningScore) {
        document.querySelector(`#name-${activePlayer}`).innerText = 'WINNER';
        DICE.style.display = 'none';

        document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
        document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');

        BTNROLL.setAttribute('disabled', true);
        BTNHOLD.setAttribute('disabled', true);

    } else {
        nextPlayer();
    }
    holdAndDice =false;
}

// NEXT PLAYER
function nextPlayer() {
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        PANEL0.classList.toggle('active');
        PANEL1.classList.toggle('active');
}

// NEW GAME: INITIALISING FUNCTION
function newGame(){
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    PANEL0.classList.remove('active');
    PANEL0.classList.remove('winner');
    PANEL1.classList.remove('active');
    PANEL1.classList.remove('winner');
    PANEL0.classList.add('active');

    NAME0.innerHTML = 'Player 1';
    NAME1.innerHTML = 'Player 2';

    scores =[0,0];
    roundScore = 0;
    activePlayer = 0;
    winningScore = 0;
    firstRoll = true;
    DICE.style.display = 'none';
    BTNROLL.removeAttribute('disabled');
    BTNHOLD.setAttribute('disabled',true);
    TARGETSCORE.removeAttribute('disabled');
    TARGETSCORE.value = "";
}