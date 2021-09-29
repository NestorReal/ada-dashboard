import { call, put, takeLatest, all } from 'redux-saga/effects';
import request from 'utils/request';
import auth from 'utils/auth';
import { addErrorMessage } from 'containers/Notifications/actions';
import * as constants from './constants';
export default function* defaultSaga() {
  yield takeLatest(constants.LOGIN_INIT, loginSaga);
}

export function* loginSaga(action) {
  const body = {
    email: action.user,
    password: action.password,
  };
  try {
    const requestURL = `https://app.progresemosdashboard.com/api/v1/dashboard/login`;
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (response.Token) {
      yield call(login, response.Token, action.history);
    }
  } catch (error) {
    yield put(addErrorMessage(`Error en credenciales, intentalo de nuevo`));
    yield put({
      type: constants.LOGIN_FAILED,
    });
  }
}

function* login(token, history) {
  // TODO: Implement remember me
  yield all([call(auth.setToken, token, true)]);
  yield call(history.push, '/');
  yield put({
    type: constants.LOGIN_SUCCEED,
  });
}
