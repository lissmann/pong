import Factory from "./Factory.js";
import EventHandler from "./EventHandler.js";
import State from "./State.js";

export default class Pong {
    #context;
    #ball;
    #leftPaddle;
    #rightPaddle;
    #scoreboard;
    #message;

    #eventHandler;

    constructor() {
        this.initialize();
        requestAnimationFrame(this.loop.bind(this));
        this.#eventHandler.addListeners();
    }

    initialize() {
        const factory = new Factory();

        this.#context = factory.context;
        this.#scoreboard = factory.createScoreboard();
        this.#ball = factory.createBall(this.#scoreboard);
        this.#leftPaddle = factory.createLeftPaddle();
        this.#rightPaddle = factory.createRightPaddle();
        this.#message = factory.createMessage();

        this.#eventHandler = new EventHandler(
            this.#context,
            this.#leftPaddle,
            this.#rightPaddle,
            this.#scoreboard,
            this.#message
        );
    }

    loop() {
        requestAnimationFrame(this.loop.bind(this));
        if (State.is(State.IN_GAME)) {
            this.draw();
        } else if (State.is(State.INTRO)) {
            this.clear();
            this.#message.play();
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
}
