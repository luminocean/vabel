import * as playerActions from '../actions/playerActions';

const KeyCodes = {
    SPACE: 32,
    LEFT_BRACE: 91,
    RIGHT_BRACE: 93,
    GREATER: 46,
    LESS: 44
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
            switch (ev.keyCode) {
            case KeyCodes.SPACE: this._pauseOrPlay(); break;
            case KeyCodes.LESS : this._leap(false); break;
            case KeyCodes.GREATER : this._leap(true); break;
            default:
                console.log(`Unhandled key pressed: ${keyCode}`); // eslint-disable-line
                break;
            }
        };
    }

    _leap(direction) {
        this._dispatch(playerActions.leap(direction));
    }

    _pauseOrPlay() {
        const isPlaying = this.state.player.control.isPlaying;
        this._dispatch(isPlaying ? playerActions.pause() : playerActions.play());
    }

    _dispatch(action) {
        this.store.dispatch(action);
    }
}


