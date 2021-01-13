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
        this.level = 10;
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

    nextLevel() {
        this.turnOnSequence()
    }

    numberToColor(num) {
        switch (num) {
            case 0:
                return 'green';
            case 1:
                return 'red';
            case 2:
                return 'purple';
            case 3:
                return 'blue';
        }
    }

    ColortoNumber(color) {
        switch (color) {
            case 'green':
                return 0;
            case 'red':
                return 1;
            case 'purple':
                return 2;
            case 'blue':
                return 3;
        }
    }


    turnOnSequence() {

        for (let i = 0; i < this.level; i++) {

            const color = this.numberToColor(this.sequence[i]);
            console.log(color);

        }

    }

    illuminateColor(color) {

    }


}







function startGame() {
    window.game = new Game();
}