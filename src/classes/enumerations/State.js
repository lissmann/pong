export default class State {
    static INTRO = "intro";
    static IN_GAME = "inGame";
    static SCORE = "score";
    static OUTRO = "outro";

    static #current = State.INTRO;

    static next() {
        switch (this.#current) {
            case State.INTRO:
                this.#current = State.IN_GAME;
                break;
            case State.IN_GAME:
                this.#current = State.OUTRO;
                break;
            case State.OUTRO:
                this.#current = State.IN_GAME;
                break;
            case State.SCORE:
                this.#current = State.IN_GAME;
                break;
            default:
                break;
        }
    }

    static score() {
        this.#current = State.SCORE;
    }

    static is(state) {
        return this.#current === state;
    }
}
