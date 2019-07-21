import { all } from 'redux-saga/effects';

import welcomeSaga from './welcome';

export default function* rootSaga() {
  yield all([
    ...welcomeSaga,
  ]);
}
