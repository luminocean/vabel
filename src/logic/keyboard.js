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

    get allowPolicy() {
        return {
            play: !this.state.crop.control.croping,
            pause: 'play', // reuse
            leap: 'play',
            crop_replay: this.state.crop.control.croping
        };
    }

    _check(phase) { // eslint-disable-line consistent-return
        const res = this.allowPolicy[phase];

        if (typeof (res) === 'boolean') {
            if (!res) console.error('Operation not allowed'); // eslint-disable-line no-console
            return res;
        }
        if (typeof (res) === 'string') {
            return this._check(res);
        }

        console.error('Unknown policy key'); // eslint-disable-line no-console
    }

    _pauseOrPlay() { // eslint-disable-line consistent-return
        if (!this._check('play') || !this._check('pause')) return;
        const playing = this.state.player.control.playing;
        if (playing) {
            this._pause();
        } else {
            this._play();
        }
    }

    _play() {
        this._dispatch(playerActions.play());
        eventCenter.emit(playerActions.CONSTANTS.PLAYER_PLAY);
    }

    _pause() {
        // register to redux store without any side affects
        this._dispatch(playerActions.pause());
        // call the player to play
        eventCenter.emit(playerActions.CONSTANTS.PLAYER_PAUSE);
    }

    _crop() {
        if (this.state.crop.control.croping) {
            this._dispatch(cropActions.cropDone());
        } else {
            // need to pause player while croping
            this._pause();
            // register (which will cause modal to show)
            this._dispatch(cropActions.crop());
        }
    }

    /**
     * Go through redux store only
     */
    _dispatch(action) {
        this.store.dispatch(action);
    }

    /**
     * Go through event emitter only
     */

    _cropReplay() { // eslint-disable-line class-methods-use-this
        if (!this._check('crop_replay')) return;
        eventCenter.emit(cropActions.CONSTANTS.CROP_REPLAY);
    }

    _leap(direction) { // eslint-disable-line class-methods-use-this
        if (!this._check('leap')) return;
        eventCenter.emit(playerActions.CONSTANTS.PLAYER_LEAP, direction);
    }
}


