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

import { getAllUsers } from '../selectors/users';

function* createMyUser() {
  yield takeEvery(WELCOME_SUBMIT_MY_USER_NAME, function* (action: WelcomeSubmitMyUserNameAction) {
    const users: UserInterface[] = yield select(getAllUsers);
    const myUserId = uuid();
    const myUser: UserInterface = {
      name: action.name,
      id: myUserId,
      active: true,
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
