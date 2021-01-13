const green = document.getElementById('green');
const red = document.getElementById('red');
const purple = document.getElementById('purple');
const blue = document.getElementById('blue');
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
            green,
            red,
            purple,
            blue
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

            setTimeout(() => {
                this.illuminateColor(color);
            }, 1000 * i);

        }

    }

    illuminateColor(color) {
        this.colors[color].classList.add('light');

        this.turnOnSound(color)

        setTimeout(() => {
            this.removeColor(color);
        }, 350);
    }

    removeColor(color) {
        this.colors[color].classList.remove('light');
    }

    turnOnSound(color) {
        switch (color) {
            case 'green':
                this.sounds.green.play();
                break;
            case 'red':
                this.sounds.red.play();
                break;
            case 'purple':
                this.sounds.purple.play();
                break;
            case 'blue':
                this.sounds.blue.play();
        }

    }


}







function startGame() {
    window.game = new Game();
}