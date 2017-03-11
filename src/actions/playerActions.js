import { createAction } from 'redux-actions';

export const CONSTANTS = {
    VIDEO_PLAY: 'VIDEO_PLAY',
    VIDEO_PAUSE: 'VIDEO_PAUSE',
    VIDEO_SEEK: 'VIDEO_SEEK'
};

export const play = createAction(CONSTANTS.VIDEO_PLAY, () => {});
export const pause = createAction(CONSTANTS.VIDEO_PAUSE, () => {});
export const seek = createAction(CONSTANTS.VIDEO_SEEK, percentage => percentage);
