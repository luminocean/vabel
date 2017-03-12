import { combineReducers } from 'redux';
import { CONSTANTS } from '../actions/playerActions';

const control = (state = {}, action) => {
    switch (action.type) {
    case CONSTANTS.VIDEO_PLAY:
        return Object.assign({}, state, {
            isPlaying: true
        });
    case CONSTANTS.VIDEO_PAUSE:
        return Object.assign({}, state, {
            isPlaying: false
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
