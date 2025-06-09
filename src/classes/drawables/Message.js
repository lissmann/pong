import Drawable from "./Drawable.js";

export default class Message extends Drawable {
    constructor(context, x, y, color) {
        super(context, x, y, 0, 0, color);
    }

    play() {
        super.context.fillStyle = super.color;
        super.context.textAlign = "center";
        super.context.font = "36px sans-serif";
        super.context.fillText("Press any key to play", super.x, super.y);
    }

    winner(player) {
        super.context.fillStyle = super.color;
        super.context.textAlign = "center";
        super.context.font = "36px sans-serif";
        super.context.fillText(`Player ${player} wins`, super.x, super.y - 30);
        super.context.font = "24px sans-serif";
        super.context.fillText(
            `Press space to play again`,
            super.x,
            super.y + 30
        );
    }
}
