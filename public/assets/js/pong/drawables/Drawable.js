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

    draw() {}

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
    }

    get y() {
        return this.#y;
    }

    set y(y) {
        this.#y = y;
    }

    get width() {
        return this.#width;
    }

    set width(width) {
        this.#width = width;
    }

    get height() {
        return this.#height;
    }

    set height(height) {
        this.#height = height;
    }

    get color() {
        return this.#color;
    }

    set color(color) {
        this.#color = color;
    }
}
