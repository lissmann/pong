import Drawable from "./Drawable.js";

export default class Paddle extends Drawable {
    #direction;
    #speed;
    #isLeftPaddle;

    constructor(context, x, y, width, height, color, speed) {
        super(context, x, y, width, height, color);

        this.#speed = speed;
        this.#direction = 0;
        this.#isLeftPaddle = this.x <= this.context.canvas.width / 2;
    }

    draw() {
        super.context.fillStyle = super.color;

        if (
            super.y + this.#direction >= 0 &&
            super.y + this.#direction <=
                super.context.canvas.height - super.height
        ) {
            super.y += this.#direction;
        } else if (super.y + this.#direction < 0) {
            super.y = 0;
        } else if (
            super.y + this.#direction >
            super.context.canvas.height - super.height
        ) {
            super.y = super.context.canvas.height - super.height;
        }

        super.context.fillRect(super.x, super.y, super.width, super.height);
    }

    up() {
        this.#direction = -this.#speed;
    }

    down() {
        this.#direction = this.#speed;
    }

    idle() {
        this.#direction = 0;
    }

    get context() {
        return super.context;
    }

    set context(context) {}

    get x() {
        return super.x;
    }

    set x(x) {}

    get width() {
        return super.width;
    }

    set width(width) {}

    get height() {
        return super.height;
    }

    set height(height) {}

    get color() {
        return super.color;
    }

    set color(color) {}

    get speed() {
        return this.#speed;
    }

    set speed(speed) {
        this.#speed = speed;
    }

    get top() {
        return super.y;
    }

    get right() {
        return super.x + super.width;
    }

    get bottom() {
        return super.y + super.height;
    }

    get left() {
        return super.x;
    }

    get front() {
        return this.#isLeftPaddle ? this.x + this.width : this.x;
    }

    get center() {
        return super.y + super.height / 2;
    }
}
