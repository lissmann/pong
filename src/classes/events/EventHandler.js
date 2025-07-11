import State from "../enumerations/State.js";

export default class EventHandler {
    #context;
    #ball;
    #leftPaddle;
    #rightPaddle;
    #scoreboard;
    #message;

    constructor(context, ball, leftPaddle, rightPaddle, scoreboard, message) {
        this.#context = context;
        this.#ball = ball;
        this.#leftPaddle = leftPaddle;
        this.#rightPaddle = rightPaddle;
        this.#scoreboard = scoreboard;
        this.#message = message;

        this.addListeners();
    }

    addListeners() {
        window.addEventListener("keydown", this.handleKeyDown);
        window.addEventListener("keyup", this.handleKeyUp);
        this.#context.canvas.addEventListener("pong:score", this.handleScore);
    }

    handleKeyDown = (event) => {
        if (State.is(State.INTRO)) {
            State.next();
            this.#ball.throwIn();

            return;
        } else if (State.is(State.OUTRO) && event.key === " ") {
            this.#scoreboard.reset();
            State.next();
            this.#ball.throwIn();

            return;
        }

        if (event.key === "ArrowUp" || event.key === "w") {
            this.#leftPaddle.up();
        } else if (event.key === "ArrowDown" || event.key === "s") {
            this.#leftPaddle.down();
        }

        if (event.key === "e") {
            this.#rightPaddle.up();
        } else if (event.key === "d") {
            this.#rightPaddle.down();
        }
    };

    handleKeyUp = (event) => {
        if (
            event.key === "ArrowUp" ||
            event.key === "ArrowDown" ||
            event.key === "w" ||
            event.key === "s"
        ) {
            this.#leftPaddle.idle();
        }

        if (event.key === "e" || event.key === "d") {
            this.#rightPaddle.idle();
        }
    };

    handleScore = (event) => {
        if (event.detail.player === 1) {
            this.#scoreboard.increasePlayer1Score();
        } else if (event.detail.player === 2) {
            this.#scoreboard.increasePlayer2Score();
        }

        if (
            this.#scoreboard.player1Score === 5 ||
            this.#scoreboard.player2Score === 5
        ) {
            State.next();
            this.#message.winner(event.detail.player);

            return;
        }

        State.score();
    };
}
