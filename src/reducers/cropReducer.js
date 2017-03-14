import { combineReducers } from 'redux';
import { CONSTANTS } from '../actions/cropActions';

const control = (state = {}, action) => {
    switch (action.type) {
    case CONSTANTS.CROP_START:
        return Object.assign({}, state, {
            croping: true
        });
    case CONSTANTS.CROP_CANCEL:
        return Object.assign({}, state, {
            croping: false
        });
    case CONSTANTS.CROP_SAVE:
        return Object.assign({}, state, {
            croping: false
        });
    default:
        return state;
    }
};

const record = (state = {}, action) => {
    switch (action.type) {
    case CONSTANTS.CROP_SAVE:
        return Object.assign({}, state, {
            list: (state.list || []).concat([action.payload])
        });
    default:
        return state;
    }
};

const reducers = { control, record };
const combined = combineReducers(reducers);
module.exports = combined;
