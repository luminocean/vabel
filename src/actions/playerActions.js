import { createAction } from 'redux-actions';

export const CONSTANTS = {
    VIDEO_PLAY: 'VIDEO_PLAY',
    VIDEO_PAUSE: 'VIDEO_PAUSE'
};

export const play = createAction(CONSTANTS.VIDEO_PLAY, () => {});
export const pause = createAction(CONSTANTS.VIDEO_PAUSE, () => {});
