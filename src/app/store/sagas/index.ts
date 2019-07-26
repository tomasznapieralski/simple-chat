import { all } from 'redux-saga/effects';

import welcomeSaga from './welcome';
import chatSaga from './chat';
import websocketSaga from './websocket';

export default function* rootSaga() {
  yield all([
    ...welcomeSaga,
    ...chatSaga,
    ...websocketSaga,
  ]);
}
