import Drawable from "./Drawable.js";

export default class Message extends Drawable {
    constructor(context, x, y, color) {
        super(context, x, y, 0, 0, color);
    }

    winner(player) {
        super.context.fillStyle = super.color;
        super.context.textAlign = "center";
        super.context.font = "30px sans-serif";
        super.context.fillText(
            `Player ${player} wins`,
            super.x,
            super.y
        );
    }
}
