import { combineReducers } from 'redux';
import { CONSTANTS } from '../actions/playerActions';
import { CONSTANTS as CROP_CONSTANTS } from '../actions/cropActions';

const control = (state = {}, action) => {
    switch (action.type) {
    case CONSTANTS.VIDEO_PLAY:
        return Object.assign({}, state, {
            playing: true
        });
    case CROP_CONSTANTS.CROP_DONE: // eslint-disable-line no-case-declarations
        // recover play status
        state = Object.assign({}, state, { // eslint-disable-line no-param-reassign
            playing: state.savedPlaying
        });
        return Object.assign({}, state, {
            savedPlaying: undefined
        });
    case CROP_CONSTANTS.CROP:
        // when croping, save current play status
        if (state.savedPlaying === undefined) { // prevent overwriting
            state = Object.assign({}, state, { // eslint-disable-line no-param-reassign
                savedPlaying: state.playing
            });
        }
        // and fall-through to pause
    case CONSTANTS.VIDEO_PAUSE: // eslint-disable-line no-fallthrough
        return Object.assign({}, state, {
            playing: false
        });
    default:
        return state;
    }
};

const progress = (state = {}, action) => {
    switch (action.type) {
    case CONSTANTS.VIDEO_SEEK:
        return Object.assign({}, state, {
            toSeek: action.payload
        });
    case CONSTANTS.VIDEO_SEEK_DONE:
        return Object.assign({}, state, {
            toSeek: undefined
        });
    case CONSTANTS.VIDEO_LEAP:
        return Object.assign({}, state, {
            toLeap: action.payload
        });
    case CONSTANTS.VIDEO_LEAP_DONE:
        return Object.assign({}, state, {
            toLeap: undefined
        });
    default:
        return state;
    }
};

const reducers = { control, progress };
const combined = combineReducers(reducers);
module.exports = combined;
