import { createAction } from 'redux-actions';

export const CONSTANTS = {
    VIDEO_LOAD: 'VIDEO_LOAD',
    VIDEO_TICK: 'VIDEO_TICK'
};

export const load = createAction(CONSTANTS.VIDEO_LOAD, url => url);
export const tick = createAction(CONSTANTS.VIDEO_TICK, progress => progress);
