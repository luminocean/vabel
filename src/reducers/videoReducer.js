import { CONSTANTS } from '../actions/videoActions';

const reducer = (state = {}, action) => {
    switch (action.type) {
    case CONSTANTS.VIDEO_LOAD:
        return {
            src: action.payload,
            progress: 0
        };
    case CONSTANTS.VIDEO_TICK:
        return Object.assign({}, state, {
            progress: action.payload
        });
    default:
        return state;
    }
};

module.exports = reducer;
