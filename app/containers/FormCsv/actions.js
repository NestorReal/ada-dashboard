/*
 *
 * FormCsv actions
 *
 */

import * as constants from './constants';

export function defaultAction() {
  return {
    type: constants.DEFAULT_ACTION,
  };
}

export function postCsv(cvs, history) {
  return {
    type: constants.GET_CVS_INIT,
    cvs,
    history,
  };
}

export function getCsv() {
  return {
    type: constants.GET_CVS_INIT,
  };
}

export function getAnalytics() {
  return {
    type: constants.GET_ANALYTICS_INIT,
  };
}

export function saveNumber(number, user) {
  return {
    type: constants.SAVE_NUMBER_INIT,
    number,
    user,
  };
}

export function check(value, user) {
  return {
    type: constants.GET_CHECK_INIT,
    value,
    user,
  };
}
