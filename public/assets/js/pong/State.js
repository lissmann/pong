export default class State {
    static INTRO = "intro";
    static IN_GAME = "inGame";
    static OUTRO = "outro";

    static #current = State.INTRO;

    static next() {
        if (this.#current === State.INTRO) {
            this.#current = State.IN_GAME;
        } else if (this.#current === State.IN_GAME) {
            this.#current = State.OUTRO;
        } else if (this.#current === State.OUTRO) {
            this.#current = State.IN_GAME;
        }
    }

    static is(state) {
        return this.#current === state;
    }
}
