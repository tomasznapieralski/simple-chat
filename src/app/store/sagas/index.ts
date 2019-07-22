import { all } from 'redux-saga/effects';

import welcomeSaga from './welcome';
import chatSaga from './chat';

export default function* rootSaga() {
  yield all([
    ...welcomeSaga,
    ...chatSaga,
  ]);
}
