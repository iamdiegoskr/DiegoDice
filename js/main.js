const green = document.getElementById('green');
const red = document.getElementById('red');
const purple = document.getElementById('purple');
const blue = document.getElementById('blue');
const btnPlay = document.getElementById('button-play');
const spanLevel = document.getElementById('level-score');
const spanMaxScore = document.getElementById('max-score');
const LAST_LEVEL = 1000;
const FIRST_LEVEL = 1;



class Game {
    constructor() {
        this.initialize();
        this.generateSequence();
        setTimeout(() => {
            this.nextLevel();
        }, 500);

    }

    initialize() {
        this.maxScore = localStorage.getItem('points');
        if (this.maxScore != null) spanMaxScore.innerHTML = this.maxScore;
        this.chooseColor = this.chooseColor.bind(this);
        spanLevel.innerHTML = FIRST_LEVEL;
        btnPlay.classList.toggle('hide')
        this.level = 1;
        this.points = 0;
        this.colors = [
            green,
            red,
            purple,
            blue
        ]
        this.sounds = {
            green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
            red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
            purple: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
            blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
        }
    }

    //generador de secuencia o patron
    generateSequence() {
        this.sequence = new Array(LAST_LEVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    //siguiente nivel
    nextLevel() {
        this.sublevel = 0;
        this.turnOnSequence();
        this.AddClickEvents();
    }

    //pasar numero a color
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

    //pasar color a numero
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

    //iluminar la secuencia
    turnOnSequence() {

        for (let i = 0; i < this.level; i++) {
            const indexColor = this.sequence[i];
            setTimeout(() => {
                this.illuminateColor(indexColor);
            }, 1000 * i);

        }

    }

    //agregar iluminacion
    illuminateColor(color) {
        this.colors[color].classList.add('light');

        this.turnOnSound(color)

        setTimeout(() => {
            this.removeColor(color);
        }, 350);
    }

    //eliminar iluminacion
    removeColor(color) {
        this.colors[color].classList.remove('light');
    }

    //agregar eventos de escucha a los botones
    AddClickEvents() {
        this.colors.forEach((color) => {
            color.addEventListener("click", this.chooseColor);
            this.buttonsPointer();
        })
    }

    //eliminar eventos de escucha a los botones
    removeClickEvents() {
        this.colors.forEach((color) => {
            color.removeEventListener("click", this.chooseColor);
            this.removeButtonsPointer();
        })
    }

    buttonsPointer() {
        this.colors.forEach((btnColor) => {
            btnColor.classList.add('pointer');
        })
    }

    removeButtonsPointer() {
        this.colors.forEach((btnColor) => {
            btnColor.classList.remove('pointer');
        })
    }

    //Usuario elige color y se valida
    chooseColor(ev) {
        const color = ev.target.dataset.color;
        const numberColor = this.ColortoNumber(color);
        this.illuminateColor(numberColor);
        if (numberColor === this.sequence[this.sublevel]) {
            this.sublevel++;
            if (this.sublevel === this.level) {
                this.level++;
                this.points += 3;
                this.removeClickEvents();
                if (this.level === LAST_LEVEL + 1) {
                    this.userWin();
                } else {
                    this.userContinue(this.level);
                }
            }
        } else {
            this.userLost();
        }
    }

    userContinue(level) {
        spanLevel.innerHTML = this.level;
        swal("Correcto", "Pasas al nivel " + level, "success")
            .then(() => {
                setTimeout(() => {
                    this.nextLevel();
                }, 1000);
            })
    }

    //usuario gano
    userWin() {
        //devuelve una promesa
        swal("Felicitaciones", "Eres el rey del juego", "success")
            .then(() => {
                this.initialize();
            })
    }

    //usuario perdio
    userLost() {
        if (this.points > this.maxScore) {
            localStorage.setItem("points", this.points);
            swal('DiegoDice', `Mejoraste tu puntuacion`, 'error')
                .then(() => {
                    this.removeClickEvents()
                    this.initialize();
                })
        } else {
            swal('DiegoDice', `Has perdido,sigue intentando`, 'error')
                .then(() => {
                    this.removeClickEvents()
                    this.initialize();
                })
        }

    }


    //Activar audio
    turnOnSound(color) {
        switch (color) {
            case 0:
                this.sounds.green.play();
                break;
            case 1:
                this.sounds.red.play();
                break;
            case 2:
                this.sounds.purple.play();
                break;
            case 3:
                this.sounds.blue.play();
        }
    }


}

//Comienza el juego
function startGame() {
    window.game = new Game();
}


(function() {
    let maxScore = localStorage.getItem('points');

    if (maxScore != null) spanMaxScore.innerHTML = maxScore;
})();