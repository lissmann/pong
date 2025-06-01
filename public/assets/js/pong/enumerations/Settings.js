class Settings {
    static ELEMENT_ID = "pong";
    static BOARD_WIDTH = 800;
    static BOARD_HEIGHT = 600;
    static BOARD_MARGIN = 20;
    static PADDLE_WIDTH = 20;
    static PADDLE_HEIGHT = 70;
    static PADDLE_SPEED = 5;
    static BALL_SPEED = 5;
    static COLOR = "white";

    static {
        const cssColor = getComputedStyle(
            document.getElementById(this.ELEMENT_ID)
        ).getPropertyValue("--pong-color");

        if (cssColor) {
            this.COLOR = cssColor;
        }
    }
}

Object.freeze(Settings);

export default Settings;
