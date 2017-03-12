import { createAction } from 'redux-actions';

export const CONSTANTS = {
    CROP: 'CROP',
    CROP_DONE: 'CROP_DONE'
};

export const crop = createAction(CONSTANTS.CROP);
export const cropDone = createAction(CONSTANTS.CROP_DONE);

