import Factory from "./Factory.js";

export default class Pong {
    #context;
    #ball;
    #leftPaddle;
    #rightPaddle;
    #scoreboard;
    #message;

    #running = true;
    #sequence = 1;

    constructor() {
        this.initialize();
        requestAnimationFrame(this.loop.bind(this));
        this.addListeners();

        this.#running = false;
        this.#message.play();
    }

    initialize() {
        const factory = new Factory();

        this.#context = factory.context;
        this.#scoreboard = factory.createScoreboard();
        this.#ball = factory.createBall(this.#scoreboard);
        this.#leftPaddle = factory.createLeftPaddle();
        this.#rightPaddle = factory.createRightPaddle();
        this.#message = factory.createMessage();
    }

    loop() {
        requestAnimationFrame(this.loop.bind(this));
        if (this.#running) {
            this.draw();
        }
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
        this.#context.clearRect(
            0,
            0,
            this.#context.canvas.width,
            this.#context.canvas.height
        );
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
        } else if (
            this.isBallCollidingWithPaddle(this.#ball, this.#rightPaddle)
        ) {
            this.#ball.left();
        }
    }

    isBallCollidingWithPaddle(ball, paddle) {
        const ballCollidingWithPaddleHorizontally =
            ball.directionX < 0
                ? ball.front <= paddle.front
                : ball.front > paddle.front;
        const ballCollidingWithPaddleVertically =
            ball.center >= paddle.top && ball.center <= paddle.bottom;

        return (
            ballCollidingWithPaddleHorizontally &&
            ballCollidingWithPaddleVertically
        );
    }

    addListeners() {
        window.addEventListener("keydown", this.handleKeyDown.bind(this));
        window.addEventListener("keyup", this.handleKeyUp.bind(this));
        this.#context.canvas.addEventListener(
            "pong:score",
            this.handleScore.bind(this)
        );
    }

    handleKeyDown(event) {
        if (!this.#running && this.#sequence === 1) {
            this.#running = true;
            this.#sequence++;

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
    }

    handleKeyUp(event) {
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
    }

    handleScore(event) {
        if (event.detail.player === 1) {
            this.#scoreboard.increasePlayer1Score();
        } else if (event.detail.player === 2) {
            this.#scoreboard.increasePlayer2Score();
        }

        if (
            this.#scoreboard.player1Score === 5 ||
            this.#scoreboard.player2Score === 5
        ) {
            this.#message.winner(event.detail.player);
            this.#running = false;
        }
    }
}
