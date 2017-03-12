import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import cropReducer from './cropReducer';
import videoReducer from './videoReducer';

const reducers = {
    player: playerReducer,
    crop: cropReducer,
    video: videoReducer
};

const combined = combineReducers(reducers);
module.exports = combined;
