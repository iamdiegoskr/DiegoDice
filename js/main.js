const btnGreen = document.getElementById('green');
const btnRed = document.getElementById('red');
const btnPurple = document.getElementById('purple');
const btnBlue = document.getElementById('blue');
const btnPlay = document.getElementById('button-play');


class Game {
    constructor() {
        this.initialize();
    }

    initialize() {
        btnPlay.classList.toggle('hide')
    }

}







function startGame() {
    const game = new Game();
}