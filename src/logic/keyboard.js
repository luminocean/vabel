import * as playerActions from '../actions/playerActions';

const KeyCodes = {
    SPACE: 32,
    LEFT_BRACE: 91,
    RIGHT_BRACE: 93
};

export default class Keyboard {
    constructor(store) {
        this.store = store;
    }

    get state() {
        return this.store.getState();
    }

    setupListening() {
        window.onkeypress = (ev) => {
            const keyCode = ev.keyCode;

            switch (keyCode) {
            case KeyCodes.SPACE: this._pauseOrPlay(); break;
            // case KeyCodes.LEFT_BRACE : this._backward(); break;
            default:
                console.log(`Unhandled key pressed: ${keyCode}`); // eslint-disable-line
                break;
            }
        };
    }

    _dispatch(action) {
        this.store.dispatch(action);
    }

    // _backward() {

    // }

    _pauseOrPlay() {
        if (this.state) {
            const isPlaying = this.state.player.control.isPlaying;
            this._dispatch(isPlaying ? playerActions.pause() : playerActions.play());
        }
    }
}


