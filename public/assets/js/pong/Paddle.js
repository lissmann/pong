import Drawable from "./Drawable.js";

export default class Paddle extends Drawable {
    #direction;
    #speed;

    constructor(context, x, y, width, height, color, speed) {
        super(context, x, y, width, height, color);

        this.#speed = speed;
        this.#direction = 0;
    }

    draw() {
        super.context.fillStyle = super.color;

        if (super.y + this.#direction >= 0
            && super.y + this.#direction <= super.context.canvas.height - super.height) {
            super.y += this.#direction;
        } else if (super.y + this.#direction < 0) {
            super.y = 0;
        } else if (super.y + this.#direction > super.context.canvas.height - super.height) {
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

    set context(context) {
    }

    set x(x) {
    }

    set y(y) {
    }

    set width(width) {
    }

    set height(height) {
    }

    set color(color) {
    }

    get speed() {
        return this.#speed;
    }

    set speed(speed) {
        this.#speed = speed;
    }
}
