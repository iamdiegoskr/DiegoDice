const btnGreen = document.getElementById('green');
const btnRed = document.getElementById('red');
const btnPurple = document.getElementById('purple');
const btnBlue = document.getElementById('blue');
const btnPlay = document.getElementById('button-play');
const LAST_LEVEL = 10;


class Game {
    constructor() {
        this.initialize();
        this.generateSequence();
        this.nextLevel();
    }

    initialize() {
        btnPlay.classList.toggle('hide')
        this.level = 1;
        this.colors = {
            btnGreen,
            btnRed,
            btnPurple,
            btnBlue
        }
        this.sounds = {
            green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
            red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
            purple: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
            blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
        }
    }

    generateSequence() {
        this.sequence = new Array(LAST_LEVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }

}







function startGame() {
    window.game = new Game();
}