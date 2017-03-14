import { createAction } from 'redux-actions';

export const CONSTANTS = {
    CROP_START: 'CROP_START',
    CROP_CANCEL: 'CROP_CANCEL',
    CROP_SAVE: 'CROP_SAVE',
    CROP_REPLAY: 'CROP_REPLAY',
    CROP_ADJUST: 'CROP_ADJUST',
    // CROP_START_DECREASE: 'CROP_START_DECREASE',
    // CROP_START_INCREASE: 'CROP_START_INCREASE',
    // CROP_END_DECREASE: 'CROP_END_DECREASE',
    // CROP_END_INCREASE: 'CROP_END_INCREASE',
    CROP_ENTER_EDITING: 'CROP_ENTER_EDITING',
    CROP_EXIT_EDITING: 'CROP_EXIT_EDITING'
};

export const crop = createAction(CONSTANTS.CROP_START);
export const cropCancel = createAction(CONSTANTS.CROP_CANCEL);
export const cropSave = createAction(CONSTANTS.CROP_SAVE, data => data);
