function User () {
    //Private Property
    let playerData= {scores:0, roundScore:0, previousDice:0 };

    // Getter and Setter from the outside world
    Object.defineProperty(this,'playerData', {
        get: function() { return playerData; },
        set: function (value) { playerData = value;}
    });

    //When hold  --> Update total scores and round scores
    this.updateScores = function(){
        playerData.scores += playerData.roundScore;
        playerData.roundScore = 0;
        return playerData.scores;
    }
}