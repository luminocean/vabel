import { combineReducers } from 'redux';
import { CONSTANTS } from '../actions/cropActions';

const control = (state = {}, action) => {
    switch (action.type) {
    case CONSTANTS.CROP:
        return Object.assign({}, state, {
            croping: true
        });
    case CONSTANTS.CROP_DONE:
        return Object.assign({}, state, {
            croping: false
        });
    default:
        return state;
    }
};

const reducers = { control };
const combined = combineReducers(reducers);
module.exports = combined;
