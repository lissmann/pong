export default class Drawable {
    #context;
    #x;
    #y;
    #width;
    #height;
    #color;

    constructor(context, x, y, width, height, color) {
        this.#context = context;
        this.#x = x;
        this.#y = y;
        this.#width = width;
        this.#height = height;
        this.#color = color;
    }

    draw() {
    }

    get context() {
        return this.#context;
    }

    set context(context) {
        this.#context = context;
    }

    get x() {
        return this.#x;
    }

    set x(x) {
        this.#x = x;

        this.draw();
    }

    get y() {
        return this.#y;
    }

    set y(y) {
        this.#y = y;

        this.draw();
    }

    get width() {
        return this.#width;
    }

    set width(width) {
        this.#width = width;

        this.draw();
    }

    get height() {
        return this.#height;
    }

    set height(height) {
        this.#height = height;

        this.draw();
    }

    get color() {
        return this.#color;
    }

    set color(color) {
        this.#color = color;

        this.draw();
    }
}
