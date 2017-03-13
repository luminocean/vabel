import { combineReducers } from 'redux';
import { CONSTANTS } from '../actions/playerActions';

const initState = {
    videoExists: true
};

const control = (state = initState, action) => {
    switch (action.type) {
    case CONSTANTS.PLAYER_PLAY:
        return Object.assign({}, state, {
            playing: true
        });
    case CONSTANTS.PLAYER_PAUSE:
        return Object.assign({}, state, {
            playing: false
        });
    default:
        return state;
    }
};

const progress = (state = initState, action) => {
    switch (action.type) {
    case CONSTANTS.PLAYER_SEEK:
        return Object.assign({}, state, {
            toSeek: action.payload
        });
    case CONSTANTS.PLAYER_SEEK_DONE:
        return Object.assign({}, state, {
            toSeek: undefined
        });
    case CONSTANTS.PLAYER_LEAP:
        return Object.assign({}, state, {
            toLeap: action.payload
        });
    case CONSTANTS.PLAYER_LEAP_DONE:
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
