/*
 *
 * FormCsv reducer
 *
 */
import produce from 'immer';
import * as constants from './constants';

export const initialState = {
  isLoading: false,
  events: [],
  analytics: {},
};

/* eslint-disable default-case, no-param-reassign */
const formCsvReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case constants.DEFAULT_ACTION:
        draft.events = {};
        break;
      case constants.DATA_RETRIEVE_INIT:
        draft.isLoading = true;
        break;
      case constants.DATA_RETRIEVE_END:
        draft.isLoading = false;
        break;
      case constants.GET_CVS_SUCCESS:
        draft.events = action.response;
        break;
      case constants.GET_ANALYTICS_SUCCESS:
        draft.analytics = action.response;
        break;
    }
  });

export default formCsvReducer;
