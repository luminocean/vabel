import { createAction } from 'redux-actions';

export const CONSTANTS = {
    PLAYER_PLAY: 'PLAYER_PLAY',
    PLAYER_PAUSE: 'PLAYER_PAUSE',
    PLAYER_SEEK: 'PLAYER_SEEK',
    PLAYER_SEEK_DONE: 'PLAYER_SEEK_DONE',
    PLAYER_LEAP: 'PLAYER_LEAP',
    PLAYER_LEAP_DONE: 'PLAYER_LEAP_DONE',
    CROP: 'CROP',
    CROP_DONE: 'CROP_DONE'
};

export const play = createAction(CONSTANTS.PLAYER_PLAY, () => {});
export const pause = createAction(CONSTANTS.PLAYER_PAUSE, () => {});
export const seek = createAction(CONSTANTS.PLAYER_SEEK, percentage => percentage);
export const seekDone = createAction(CONSTANTS.PLAYER_SEEK_DONE);
export const leap = createAction(CONSTANTS.PLAYER_LEAP, direction => direction);
export const leapDone = createAction(CONSTANTS.PLAYER_LEAP_DONE);
export const crop = createAction(CONSTANTS.CROP);
export const cropDone = createAction(CONSTANTS.CROP_DONE);

