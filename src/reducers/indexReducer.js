import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import cropReducer from './cropReducer';

const reducers = {
    player: playerReducer,
    crop: cropReducer
};
const combined = combineReducers(reducers);
module.exports = combined;
