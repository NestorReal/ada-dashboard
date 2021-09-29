import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import auth from 'utils/auth';
import * as constants from './constants';
import { getCsv } from './actions';

// Individual exports for testing
export default function* gradeSaga() {
  yield takeLatest(constants.GET_CVS_INIT, saveCsvSaga);
  yield takeLatest(constants.GET_ANALYTICS_INIT, getAnalyticsSaga);
  yield takeLatest(constants.SAVE_NUMBER_INIT, saveNumberSaga);
  yield takeLatest(constants.GET_CHECK_INIT, checkSaga);
}

export function* saveNumberSaga(action) {
  const body = {
    phoneNumber: action.number,
  };
  try {
    const requestURL = `https://app.progresemosdashboard.com/api/v1/dashboard/updatePhoneNumberUser/${action.user.toString()}`;
    const response = yield call(request, requestURL, {
      method: 'PUT',
      headers: {
        'x-access-token': `${auth.getToken()}`,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(body),
    });
    if (response) {
      yield put(getCsv());
    }
  } catch (error) {
    yield put({
      type: constants.SAVE_NUMBER_FAILED,
    });
  }
}

export function* checkSaga(action) {
  const body = {
    reviewed: !action.value,
  };
  try {
    const requestURL = `https://app.progresemosdashboard.com/api/v1/dashboard/checkReviewed/${action.user.toString()}`;
    const response = yield call(request, requestURL, {
      method: 'PUT',
      headers: {
        'x-access-token': `${auth.getToken()}`,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(body),
    });
    if (response) {
      yield put(getCsv());
    }
  } catch (error) {
    yield put({
      type: constants.SAVE_NUMBER_FAILED,
    });
  }
}

export function* saveCsvSaga() {
  yield put({
    type: constants.DATA_RETRIEVE_INIT,
  });
  try {
    const requestURL = `https://app.progresemosdashboard.com/api/v1/dashboard/listUsers`;
    /* eslint-disable react/prefer-stateless-function */
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        'x-access-token': `${auth.getToken()}`,
        Accept: 'multipart/form-data',
      },
    });
    if (response) {
      yield put({
        type: constants.GET_CVS_SUCCESS,
        response,
      });
    }
  } catch (error) {
    yield put({
      type: constants.GET_CVS_FAILED,
    });
  }
  yield put({
    type: constants.DATA_RETRIEVE_END,
  });
}

export function* getAnalyticsSaga() {
  try {
    const requestURL = `https://app.progresemosdashboard.com/api/v1/dashboard/analytics`;
    /* eslint-disable react/prefer-stateless-function */
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        'x-access-token': `${auth.getToken()}`,
        Accept: 'multipart/form-data',
      },
    });
    if (response) {
      yield put({
        type: constants.GET_ANALYTICS_SUCCESS,
        response,
      });
    }
  } catch (error) {
    yield put({
      type: constants.GET_ANALYTICS_FAILED,
    });
  }
}
