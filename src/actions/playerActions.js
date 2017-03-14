import { createAction } from 'redux-actions';

export const CONSTANTS = {
    PLAYER_PLAY: 'PLAYER_PLAY',
    PLAYER_PAUSE: 'PLAYER_PAUSE',
    PLAYER_LEAP: 'PLAYER_LEAP',
    PLAYER_SEEK: 'PLAYER_SEEK'
};

export const play = createAction(CONSTANTS.PLAYER_PLAY, () => {});
export const pause = createAction(CONSTANTS.PLAYER_PAUSE, () => {});
