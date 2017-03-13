import * as playerActions from '../actions/playerActions';
import * as cropActions from '../actions/cropActions';
import eventCenter from '../logic/eventCenter';

const KeyCodes = {
    SPACE: 32,
    LEFT_BRACE: 91,
    RIGHT_BRACE: 93,
    GREATER: 46,
    LESS: 44,
    C: 99,
    R: 114
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
            case KeyCodes.LESS: this._leap(false); break;
            case KeyCodes.GREATER: this._leap(true); break;
            case KeyCodes.C: this._crop(); break;
            case KeyCodes.R: this._cropReplay(); break;
            default:
                console.log(`Unhandled key pressed: ${ev.keyCode}`); // eslint-disable-line
                break;
            }
        };
    }

    /**
     * Go through redux store
     */
    _crop() {
        this._dispatch(this.state.crop.control.croping ?
            cropActions.cropDone() : cropActions.crop());
    }

    _leap(direction) {
        this._dispatch(playerActions.leap(direction));
    }

    _pauseOrPlay() {
        const playing = this.state.player.control.playing;
        this._dispatch(playing ? playerActions.pause() : playerActions.play());
    }

    _dispatch(action) {
        this.store.dispatch(action);
    }

    /**
     * Go through event emitter
     */
    _cropReplay() { // eslint-disable-line class-methods-use-this
        eventCenter.emit(cropActions.CONSTANTS.CROP_REPLAY);
    }
}


