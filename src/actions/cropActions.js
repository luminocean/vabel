import { createAction } from 'redux-actions';

export const CONSTANTS = {
    CROP: 'CROP',
    CROP_DONE: 'CROP_DONE',
    CROP_REPLAY: 'CROP_REPLAY',
    CROP_START_DECREASE: 'CROP_START_DECREASE',
    CROP_START_INCREASE: 'CROP_START_INCREASE',
    CROP_END_DECREASE: 'CROP_END_DECREASE',
    CROP_END_INCREASE: 'CROP_END_INCREASE'
};

export const crop = createAction(CONSTANTS.CROP);
export const cropDone = createAction(CONSTANTS.CROP_DONE);

