import { takeEvery, select, put } from 'redux-saga/effects';
import uuid from 'uuid';

import { UserInterface } from '../interfaces/users';

import {
  WELCOME_SUBMIT_MY_USER_NAME,
  WelcomeSubmitMyUserNameAction,
} from '../actions/welcome';

import {
  usersSaveMyUserId,
  usersSaveUsers,
} from '../actions/users';

import { getData } from '../selectors/users';

function* createMyUser() {
  yield takeEvery(WELCOME_SUBMIT_MY_USER_NAME, function* (action: WelcomeSubmitMyUserNameAction) {
    const users: UserInterface[] = yield select(getData);
    const myUserId = uuid();
    const myUser: UserInterface = {
      name: action.name,
      id: myUserId,
    };

    yield put(usersSaveUsers([
      ...users,
      myUser,
    ]));
    yield put(usersSaveMyUserId(myUserId));
  });
}

export default [
  createMyUser(),
];
