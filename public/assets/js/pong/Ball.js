import Drawable from "./Drawable.js";

export default class Ball extends Drawable {
    constructor(context, x, y, diameter, color) {
        super(context, x, y, diameter / 2, diameter / 2, color);
    }

    draw() {
        super.context.fillStyle = super.color;

        super.context.beginPath();
        super.context.arc(super.x, super.y, 10, 0, Math.PI * 2);
        super.context.fill();
        super.context.closePath();
    }

    set context(context) {
    }

    set width(width) {
    }

    set height(height) {
    }

    set color(color) {
    }
}
