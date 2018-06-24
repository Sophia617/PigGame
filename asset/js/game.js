function Game (){
    // private property
    let winningScore;

    //Getter and Setter
    Object.defineProperty(this,'winningScore', {
        get: function() { return winningScore; },
        set: function (value) { winningScore = value; }
    });

    // ROLL THE DICE FUNCTION - Generate Random Num (1-6) and return the value
    this.rollTheDice = function() {
        //Generate Random Number
        return Math.round(Math.random()*5)+1;
    };
}