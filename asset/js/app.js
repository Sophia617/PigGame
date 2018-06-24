document.addEventListener("DOMContentLoaded", function(event) {

    /***********************************
     * WHEN PAGE LOADED
     * ********************************/
    // To MAKE SURE TO GET DOM ELEMENT BEFORE CODE RUN
    intializeDOM();

    //GLOBAL STATE VARIABLES
    let holdAndDice,firstRoll,activePlayer;

    // 1) Create 2 Players  2) Create New game Object 3) Initialise the Game
    const player0 = new User();
    const player1 =new User();
    let players = [player0, player1];
    const gameObj = new Game();
    newGame();

    /***********************************
     * WHEN DOM BUTTONS CLICKED
     * ********************************/

    // NEW GAME BUTTON
    BTNNEWGAME.addEventListener("click", newGame);

    // ROLL DICE BUTTON
    BTNROLL.addEventListener("click", function(){
        //Set Target score for winning
        let targetScore = TARGETSCORE.value;
        gameObj.winningScore = targetScore;

        //Roll the dice
        if (targetScore !== "" && firstRoll) {
            firstRoll = false;
            BTNHOLD.removeAttribute('disabled');
            TARGETSCORE.setAttribute('disabled', true);
            rollTheDicAndDOM(gameObj.rollTheDice());
        } else if (targetScore === "" && firstRoll) {
            alert('Please enter target score to start the game!');
        } else {
            rollTheDicAndDOM(gameObj.rollTheDice());
        }
    });

    // HOLD BUTTON
    BTNHOLD.addEventListener("click", function(){
        //If current score is 0
        if (players[activePlayer].playerData.roundScore === 0) {
            alert(`Your round sore is 0. There is nothing to hold! It is next player's turn. Please roll the dice!`);
        } else {
            holdAndDice ? holdScores() : alert('You have already clicked Hold button. Please Roll the Dice!');
        }
    });

    /***********************************
     * FUNCTIONS
     * ********************************/

    // ROLL DICE Function -  What we expect to be happened when the Dice rolled (DOM manipulation & Update Player Data)
    function rollTheDicAndDOM(dice) {
        //Current dice number
        let currentDice = dice;

        //Display the Dice image of random Number
        DICE.style.display = 'block';
        DICE.setAttribute('src', `asset/images/dice-${currentDice}.png`);

        //TargetElement
        let currentRoundScore = document.querySelector(`#current-${activePlayer}`);
        let currentTotalScore = document.querySelector(`#score-${activePlayer}`);

        //Update DOM Element Round Score  - Depending on the player
        if(players[activePlayer].playerData.previousDice === 6 && currentDice ===6) {
            players[activePlayer].playerData = {scores:0, roundScore:0, previousDice:0};
            currentTotalScore.textContent = '0';
            nextPlayer();
        } else if(currentDice!==1){
            players[activePlayer].playerData.roundScore+= currentDice;
            players[activePlayer].playerData.previousDice = currentDice;
        } else {
            players[activePlayer].playerData.previousDice = 0;
            players[activePlayer].playerData.roundScore =0;
            nextPlayer();
        }
        currentRoundScore.innerHTML = players[activePlayer].playerData.roundScore;
        holdAndDice = true;
    }

    // HOLD SCORE FUNCTION
    function holdScores () {
        //Add Current score to Global Score and get total score.
        let totalScores = players[activePlayer].updateScores();

        //Update UI
        let currentRoundScore = document.querySelector(`#current-${activePlayer}`);
        let currentTotalScore = document.querySelector(`#score-${activePlayer}`);
        currentTotalScore.innerHTML = totalScores;
        currentRoundScore.innerHTML = '0';

        //check if player won the game
        if (totalScores >= gameObj.winningScore) {
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
        PANEL0.classList.toggle('active');
        PANEL1.classList.toggle('active');
    }

    // INIT Function
    function newGame(){
        // Initializing UI - DOM element
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

        DICE.style.display = 'none';
        BTNROLL.removeAttribute('disabled');
        BTNHOLD.setAttribute('disabled',true);
        TARGETSCORE.removeAttribute('disabled');
        TARGETSCORE.value = "";

        // Initializing Global state Variable
        firstRoll = true;
        holdAndDice = true;

        // Initializing User Data (Set Default Value for each player)
        player0.playerData = {scores:0, roundScore:0,previousDice:0 };
        player1.playerData = {scores:0, roundScore:0,previousDice:0 };

        // Initializing Game Obj property
        gameObj.winningScore = 0;

        // Set the First Player
        activePlayer = 0;
    }
});

