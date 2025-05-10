import Drawable from "./Drawable.js";

export default class Ball extends Drawable {
    #directionX;
    #directionY;
    #speed;
    #scoreboard;

    constructor(context, x, y, diameter, color, speed, scoreboard) {
        super(context, x, y, diameter / 2, diameter / 2, color);

        this.#speed = speed;
        this.#directionX = speed;
        this.#directionY = speed;
        this.#scoreboard = scoreboard;
    }

    draw() {
        super.context.fillStyle = super.color;

        const radius = super.width;
        const newX = super.x + this.#directionX;
        const leftEdge = newX - radius;
        const rightEdge = newX + radius;
        const canvasWidth = super.context.canvas.width;
        const maximumRightEdge = canvasWidth - radius;

        if (leftEdge > 0 && rightEdge < canvasWidth) {
            super.x += this.#directionX;
        } else if (leftEdge <= 0) {
            super.x = radius;
            this.right();
            super.context.canvas.dispatchEvent(new CustomEvent('pong:score', {detail: {player: 2}}));
        } else if (rightEdge >= maximumRightEdge) {
            super.x = maximumRightEdge;
            this.left();
            super.context.canvas.dispatchEvent(new CustomEvent('pong:score', {detail: {player: 1}}));
        }

        const newY = super.y + this.#directionY;
        const topEdge = newY - radius;
        const bottomEdge = newY + radius;
        const canvasHeight = super.context.canvas.height;
        const maximumBottomEdge = canvasHeight - radius;

        if (topEdge > 0 && bottomEdge < canvasHeight) {
            super.y += this.#directionY;
        } else if (topEdge <= 0) {
            super.y = radius;
            this.down();
        } else if (bottomEdge >= maximumBottomEdge) {
            super.y = maximumBottomEdge;
            this.up();
        }

        super.context.beginPath();
        super.context.arc(super.x, super.y, super.width, 0, 2 * Math.PI);
        super.context.fill();
        super.context.closePath();
    }

    left() {
        this.#directionX = -this.#speed;
    }

    right() {
        this.#directionX = this.#speed;
    }

    up() {
        this.#directionY = -this.#speed;
    }

    down() {
        this.#directionY = this.#speed;
    }

    idle() {
        this.#directionX = 0;
        this.#directionY = 0;
    }

    get context() {
        return super.context;
    }

    set context(context) {
    }

    get width() {
        return super.width;
    }

    set width(width) {
    }

    get height() {
        return super.height;
    }

    set height(height) {
    }

    get color() {
        return super.color;
    }

    set color(color) {
    }

    get directionX() {
        return this.#directionX;
    }

    set directionX(directionX) {
    }

    get speed() {
        return this.#speed;
    }

    set speed(speed) {
        this.#speed = speed;
    }

    get center() {
        return super.y;
    }

    get front() {
        return this.#directionX < 0 ? super.x - super.width : super.x + super.width;
    }
}
