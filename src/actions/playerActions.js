import { createAction } from 'redux-actions';

export const CONSTANTS = {
    VIDEO_PLAY: 'VIDEO_PLAY',
    VIDEO_PAUSE: 'VIDEO_PAUSE',
    VIDEO_SEEK: 'VIDEO_SEEK',
    VIDEO_SEEK_DONE: 'VIDEO_SEEK_DONE',
    VIDEO_LEAP: 'VIDEO_LEAP',
    VIDEO_LEAP_DONE: 'VIDEO_LEAP_DONE',
    CROP: 'CROP',
    CROP_DONE: 'CROP_DONE'
};

export const play = createAction(CONSTANTS.VIDEO_PLAY, () => {});
export const pause = createAction(CONSTANTS.VIDEO_PAUSE, () => {});
export const seek = createAction(CONSTANTS.VIDEO_SEEK, percentage => percentage);
export const seekDone = createAction(CONSTANTS.VIDEO_SEEK_DONE);
export const leap = createAction(CONSTANTS.VIDEO_LEAP, direction => direction);
export const leapDone = createAction(CONSTANTS.VIDEO_LEAP_DONE);
export const crop = createAction(CONSTANTS.CROP);
export const cropDone = createAction(CONSTANTS.CROP_DONE);

