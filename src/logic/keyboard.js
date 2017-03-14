import * as playerActions from '../actions/playerActions';
import * as cropActions from '../actions/cropActions';
import eventCenter from '../logic/eventCenter';

const KeyCodes = {
    SPACE: 32,
    ENTER: 13,
    LEFT_BRACE: 91,
    RIGHT_BRACE: 93,
    GREATER: 46,
    LESS: 44,
    C: 99,
    c: 67,
    R: 114,
    r: 82,
    Q: 81,
    q: 113,
    W: 87,
    w: 119,
    O: 79,
    o: 111,
    P: 80,
    p: 112
};

export default class Keyboard {
    constructor(store) {
        this.store = store;
        this.acceptCommands = true;
    }

    get state() {
        return this.store.getState();
    }

    setupListening() {
        window.onkeypress = (ev) => {
            if (this.acceptCommands) {
                switch (ev.keyCode) {
                case KeyCodes.SPACE: this._pauseOrPlay(); break;
                case KeyCodes.LESS: this._leap(false); break;
                case KeyCodes.GREATER: this._leap(true); break;
                case KeyCodes.ENTER: this._cropSave(); break;
                case KeyCodes.C:
                case KeyCodes.c: this._crop(); break;
                case KeyCodes.R:
                case KeyCodes.r: this._cropReplay(); break;
                case KeyCodes.Q:
                case KeyCodes.q: this._cropAdjust('start', false); break;
                case KeyCodes.W:
                case KeyCodes.w: this._cropAdjust('start', true); break;
                case KeyCodes.O:
                case KeyCodes.o: this._cropAdjust('end', false); break;
                case KeyCodes.P:
                case KeyCodes.p: this._cropAdjust('end', true); break;
                default:
                    console.log(`Unhandled key pressed: ${ev.keyCode}`); // eslint-disable-line
                    break;
                }
            }
        };

        eventCenter.on(cropActions.CONSTANTS.CROP_ENTER_EDITING,
            () => { this.acceptCommands = false; });
        eventCenter.on(cropActions.CONSTANTS.CROP_EXIT_EDITING,
            () => { this.acceptCommands = true; });
    }

    get allowPolicy() {
        return {
            play: !this.state.crop.control.croping,
            pause: 'play', // reuse
            leap: 'play',
            crop_done: this.state.crop.control.croping,
            crop_replay: 'crop_done',
            crop_adjust: 'crop_done',
            crop_finish: 'crop_done'
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
        if (playing) this._pause();
        else this._play();
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

    // show or hide crop panel
    _crop() {
        if (this.state.crop.control.croping) {
            this._dispatch(cropActions.cropCancel());
        } else {
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
    _cropSave() { // eslint-disable-line class-methods-use-this
        if (!this._check('crop_finish')) return;
        eventCenter.emit(cropActions.CONSTANTS.CROP_SAVE);
    }

    _cropReplay() { // eslint-disable-line class-methods-use-this
        if (!this._check('crop_replay')) return;
        eventCenter.emit(cropActions.CONSTANTS.CROP_REPLAY);
    }

    _leap(direction) { // eslint-disable-line class-methods-use-this
        if (!this._check('leap')) return;
        eventCenter.emit(playerActions.CONSTANTS.PLAYER_LEAP, direction);
    }

    _cropAdjust(type, increase) {
        if (!this._check('crop_adjust')) return;
        eventCenter.emit(cropActions.CONSTANTS.CROP_ADJUST, type, increase ? 1 : -1);
    }
}
