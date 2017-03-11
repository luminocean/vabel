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

const reducers = { control };
const combined = combineReducers(reducers);
module.exports = combined;
