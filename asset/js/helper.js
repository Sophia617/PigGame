
// DOM BUTTON
let BTNROLL = null;
let BTNHOLD = null;
let BTNNEWGAME = null;
// DOM ELEMENT
let TARGETSCORE = null;
let DICE = null;
let PANEL0 = null;
let PANEL1 = null;
let NAME0 = null;
let NAME1 = null;

function intializeDOM() {
    BTNROLL = document.querySelector('.btn-roll');
    BTNHOLD = document.querySelector('.btn-hold');
    BTNNEWGAME = document.querySelector('.btn-new');
    TARGETSCORE = document.querySelector('.targetScore');
    DICE = document.querySelector('.dice');
    PANEL0 = document.querySelector('.player-0-panel');
    PANEL1 = document.querySelector('.player-1-panel');
    NAME0 = document.querySelector('#name-0');
    NAME1 = document.querySelector('#name-1');
}