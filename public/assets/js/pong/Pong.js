import Paddle from "./Paddle.js"
import Ball from "./Ball.js"
import Scoreboard from "./Scoreboard.js";

export default class Pong {
    #context;
    #ball;
    #leftPaddle;
    #rightPaddle;
    #scoreboard;

    constructor() {
        const BOARD_WIDTH = 800;
        const BOARD_HEIGHT = 600;
        const BOARD_MARGIN = 20;
        const PADDLE_WIDTH = 20;
        const PADDLE_HEIGHT = 70;
        const PADDLE_SPEED = 5;
        const BALL_SPEED = 5;
        const COLOR = "white";

        this.#context = document.getElementById("pong").getContext("2d");
        this.#scoreboard = new Scoreboard(this.#context, BOARD_WIDTH / 2, 50);
        this.#ball = new Ball(this.#context, BOARD_WIDTH / 2, BOARD_HEIGHT / 2, PADDLE_WIDTH, COLOR, BALL_SPEED, this.#scoreboard);
        this.#leftPaddle = new Paddle(this.#context, BOARD_MARGIN, BOARD_HEIGHT / 2 - PADDLE_HEIGHT / 2, PADDLE_WIDTH, PADDLE_HEIGHT, COLOR, PADDLE_SPEED);
        this.#rightPaddle = new Paddle(this.#context, BOARD_WIDTH - PADDLE_WIDTH - BOARD_MARGIN, BOARD_HEIGHT / 2 - PADDLE_HEIGHT / 2, PADDLE_WIDTH, PADDLE_HEIGHT, COLOR, PADDLE_SPEED);

        requestAnimationFrame(this.loop.bind(this));
        this.addListeners();
    }

    loop() {
        requestAnimationFrame(this.loop.bind(this));
        this.draw();
    }

    draw() {
        this.clear();
        this.#leftPaddle.draw();
        this.#rightPaddle.draw();
        this.#ball.draw();
        this.#scoreboard.draw();
        this.moveRightPaddle();
        this.checkCollision();
    }

    clear() {
        this.#context.clearRect(0, 0, this.#context.canvas.width, this.#context.canvas.height);
    }

    moveRightPaddle() {
        const ballMovingToTheRight = this.#ball.directionX > 0;
        const fastSpeed = 0.9 * this.#rightPaddle.speed;
        const slowSpeed = 0.25 * this.#rightPaddle.speed;

        if (this.#rightPaddle.center > this.#ball.center) {
            this.#rightPaddle.y -= ballMovingToTheRight ? fastSpeed : slowSpeed;
        } else if (this.#rightPaddle.center < this.#ball.center) {
            this.#rightPaddle.y += ballMovingToTheRight ? fastSpeed : slowSpeed;
        }
    }

    checkCollision() {
        if (this.isBallCollidingWithPaddle(this.#ball, this.#leftPaddle)) {
            this.#ball.right();
        } else if (this.isBallCollidingWithPaddle(this.#ball, this.#rightPaddle)) {
            this.#ball.left();
        }
    }

    isBallCollidingWithPaddle(ball, paddle) {
        const ballCollidingWithPaddleHorizontally =
            ball.directionX < 0 ? ball.front <= paddle.front : ball.front > paddle.front;
        const ballCollidingWithPaddleVertically =
            ball.center >= paddle.top && ball.center <= paddle.bottom;

        return ballCollidingWithPaddleHorizontally && ballCollidingWithPaddleVertically;
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
