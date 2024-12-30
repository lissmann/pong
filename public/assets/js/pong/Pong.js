import Paddle from "./Paddle.js"
import Ball from "./Ball.js"

export default class Pong {
    #context;
    #ball;
    #leftPaddle;
    #rightPaddle;

    constructor() {
        const BOARD_WIDTH = 800;
        const BOARD_HEIGHT = 600;
        const BOARD_MARGIN = 20;
        const PADDLE_WIDTH = 20;
        const PADDLE_HEIGHT = 70;
        const PADDLE_SPEED = 5;
        const COLOR = "white";

        this.#context = document.getElementById("pong").getContext("2d");
        this.#ball = new Ball(this.#context, BOARD_WIDTH / 2, BOARD_HEIGHT / 2, PADDLE_WIDTH, COLOR);
        this.#leftPaddle = new Paddle(this.#context, BOARD_MARGIN, BOARD_HEIGHT / 2 - PADDLE_HEIGHT / 2, PADDLE_WIDTH, PADDLE_HEIGHT, COLOR, PADDLE_SPEED);
        this.#rightPaddle = new Paddle(this.#context, BOARD_WIDTH - PADDLE_WIDTH - BOARD_MARGIN, BOARD_HEIGHT / 2 - PADDLE_HEIGHT / 2, PADDLE_WIDTH, PADDLE_HEIGHT, COLOR, PADDLE_SPEED);

        requestAnimationFrame(this.loop.bind(this));
        this.addListeners();
    }

    loop() {
        this.draw();
        requestAnimationFrame(this.loop.bind(this));
    }

    draw() {
        this.clear();
        this.#ball.draw();
        this.#leftPaddle.draw();
        this.#rightPaddle.draw();
    }

    clear() {
        this.#context.clearRect(0, 0, this.#context.canvas.width, this.#context.canvas.height);
    }

    addListeners() {
        window.addEventListener("keydown", this.handleKeyDown.bind(this));
        window.addEventListener("keyup", this.handleKeyUp.bind(this));
    }

    handleKeyDown(event) {
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
    }

    handleKeyUp(event) {
        if (event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "w" || event.key === "s") {
            this.#leftPaddle.idle();
        }

        if (event.key === "e" || event.key === "d") {
            this.#rightPaddle.idle();
        }
    }
}
