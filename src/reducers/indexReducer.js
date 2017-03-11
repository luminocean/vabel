import { combineReducers } from 'redux';
import playerReducer from './playerReducer';

const reducers = {
    player: playerReducer
};
const combined = combineReducers(reducers);
module.exports = combined;
