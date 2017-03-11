import { createAction } from 'redux-actions';

export const CONSTANTS = {
    VIDEO_PLAY: 'VIDEO_PLAY'
};

export const play = createAction(CONSTANTS.VIDEO_PLAY, () => {});
