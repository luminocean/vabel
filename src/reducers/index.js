import { combineReducers } from 'redux';
import playerReducer from './player';

const reducers = { playerReducer };
const combined = combineReducers(reducers);
module.exports = combined;
