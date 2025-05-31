import Drawable from "./Drawable.js";

export default class Scoreboard extends Drawable {
    #player1Score;
    #player2Score;

    constructor(context, x, y, color) {
        super(context, x, y, 0, 0, color);

        this.reset();
    }

    draw() {
        super.context.fillStyle = super.color;
        super.context.textAlign = "center";
        super.context.font = "30px sans-serif";
        super.context.fillText(
            `${this.#player1Score} : ${this.#player2Score}`,
            super.x,
            super.y
        );
    }

    increasePlayer1Score() {
        this.#player1Score++;
    }

    increasePlayer2Score() {
        this.#player2Score++;
    }

    reset() {
        this.#player1Score = 0;
        this.#player2Score = 0;
    }

    get player1Score() {
        return this.#player1Score;
    }

    get player2Score() {
        return this.#player2Score;
    }
}
