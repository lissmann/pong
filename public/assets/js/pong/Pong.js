import Paddle from "./Paddle.js"
import Ball from "./Ball.js";

export default class Pong {
    #context;
    #ball;
    #leftPaddle;
    #rightPaddle;

    constructor() {
        const boardWidth = 800;
        const boardHeight = 600;
        const boardMargin = 20;
        const paddleWidth = 20;
        const paddleHeight = 70;
        const color = "white";

        this.#context = document.getElementById('pong').getContext('2d');
        this.#ball = new Ball(this.#context, boardWidth / 2, boardHeight / 2, paddleWidth, color);
        this.#leftPaddle = new Paddle(this.#context, boardMargin, boardHeight / 2 - paddleHeight / 2, paddleWidth, paddleHeight, color);
        this.#rightPaddle = new Paddle(this.#context, boardWidth - paddleWidth - boardMargin, boardHeight / 2 - paddleHeight / 2, paddleWidth, paddleHeight, color);

        this.draw();
    }

    draw() {
        this.#ball.draw();
        this.#leftPaddle.draw();
        this.#rightPaddle.draw();
    }
}
