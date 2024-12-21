import Drawable from "./Drawable.js";

export default class Paddle extends Drawable {
    constructor(context, x, y, width, height, color) {
        super(context, x, y, width, height, color);
    }

    draw() {
        super.context.fillStyle = super.color;

        super.context.fillRect(super.x, super.y, super.width, super.height);
    }

    set context(context) {
    }

    set x(x) {
    }

    set width(width) {
    }

    set height(height) {
    }

    set color(color) {
    }
}
