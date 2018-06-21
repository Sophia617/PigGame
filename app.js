/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

let scores, roundScore, activePlayer;

const BUTTONROLL = document.querySelector('.btn-roll');
const DICE = document.querySelector('.dice');
const PANEL0 = document.querySelector('.player-0-panel');
const PANEL1 = document.querySelector('.player-1-panel');
const BTNHOLD = document.querySelector('.btn-hold');
const NEWGAME = document.querySelector('.btn-new');
const NAME0 = document.querySelector('#name-0');
const NAME1 = document.querySelector('#name-1');

init();

// INITIALISING FUNCTION
function init(){
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
    DICE.style.display = 'none';
    BUTTONROLL.removeAttribute('disabled');
    BTNHOLD.removeAttribute('disabled');
}

// RUN THE DICE FUNCTION
BUTTONROLL.addEventListener("click", function(){
    //Generate Random Number
    let dice = Math.round(Math.random()*5)+1;

    //Display the Dice image of random Number
    DICE.style.display = 'block';
    DICE.setAttribute('src', `dice-${dice}.png`);

    //Update the round score if the rolled number is NOT 1
    let CURRENT = document.querySelector(`#current-${activePlayer}`);
    dice!==1 ? roundScore+=dice : nextPlayer();
    CURRENT.innerHTML = roundScore;
});

//HOLD FUNCTION
BTNHOLD.addEventListener("click", function(){
    //Add Current scare to Global Score
    scores[activePlayer] += roundScore;

    //Update UI
    let playerScore =  document.querySelector(`#score-${activePlayer}`);
    playerScore.innerHTML = scores[activePlayer];

    //check if player won the game
    if (scores[activePlayer] >= 20) {
        document.querySelector(`#name-${activePlayer}`).innerText = 'WINNER';
        DICE.style.display = 'none';

        document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
        document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');

        BUTTONROLL.setAttribute('disabled',true);
        BTNHOLD.setAttribute('disabled',true);

    } else {
        nextPlayer();
    }
});

// NEXT PLAYER
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer =0;
    roundScore =0;
    PANEL0.classList.toggle('active');
    PANEL1.classList.toggle('active');
}

// START NEW GAME
NEWGAME.addEventListener("click", init);