import Settings from "../enumerations/Settings.js";
import Scoreboard from "./Scoreboard.js";
import Ball from "./Ball.js";
import Paddle from "./Paddle.js";
import Message from "./Message.js";

export default class Factory {
    createScoreboard() {
        return new Scoreboard(
            this.context,
            Settings.BOARD_WIDTH / 2,
            50,
            Settings.COLOR
        );
    }

    createBall(scoreboard) {
        return new Ball(
            this.context,
            Settings.BOARD_WIDTH / 2,
            Settings.BOARD_HEIGHT / 2,
            Settings.PADDLE_WIDTH,
            Settings.COLOR,
            Settings.BALL_SPEED,
            scoreboard
        );
    }

    createLeftPaddle() {
        return new Paddle(
            this.context,
            Settings.BOARD_MARGIN,
            Settings.BOARD_HEIGHT / 2 - Settings.PADDLE_HEIGHT / 2,
            Settings.PADDLE_WIDTH,
            Settings.PADDLE_HEIGHT,
            Settings.COLOR,
            Settings.PADDLE_SPEED
        );
    }

    createRightPaddle() {
        return new Paddle(
            this.context,
            Settings.BOARD_WIDTH -
                Settings.PADDLE_WIDTH -
                Settings.BOARD_MARGIN,
            Settings.BOARD_HEIGHT / 2 - Settings.PADDLE_HEIGHT / 2,
            Settings.PADDLE_WIDTH,
            Settings.PADDLE_HEIGHT,
            Settings.COLOR,
            Settings.PADDLE_SPEED
        );
    }

    createMessage() {
        return new Message(
            this.context,
            Settings.BOARD_WIDTH / 2,
            Settings.BOARD_HEIGHT / 2,
            Settings.COLOR
        );
    }

    get context() {
        return document.getElementById(Settings.ELEMENT_ID).getContext("2d");
    }
}
