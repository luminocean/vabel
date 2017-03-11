import { combineReducers } from 'redux';
import { CONSTANTS } from '../actions/player';

const play = (state = {}, action) => {
    switch (action.type) {
    case CONSTANTS.VIDEO_PLAY:
        return Object.assign({}, state, {
            player: {
                isPlaying: true
            }
        });
    default:
        return state;
    }
};

const reducers = { play };
const combined = combineReducers(reducers);
module.exports = combined;
