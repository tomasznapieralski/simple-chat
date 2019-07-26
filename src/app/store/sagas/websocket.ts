import { takeEvery, select, delay, put } from 'redux-saga/effects';

import { UserInterface } from '../interfaces/users';
import { WebSocketMessageDataInterface } from '../interfaces/websockets';

import { ROOM_INIT, RoomInitAction } from '../actions/room';
import {
  webSocketOpen,
  webSocketClose,
  WEBSOCKET_OPEN,
  WEBSOCKET_CLOSE,
  WebSocketCloseAction,
  webSocketReconnect,
  WEBSOCKET_RECONNECT,
  webSocketRegisterUser,
  webSocketError,
  WEBSOCKET_MESSAGE,
  WebSocketMessageAction,
  webSocketMessage,
} from '../actions/websocket';
import { usersSaveUsers } from '../actions/users';

import { getMyUserId, getAllUsers } from '../selectors/users';
import { getWebSocket } from '../selectors/websocket';


function* connectToServer() {
  yield takeEvery(
    [ROOM_INIT, WEBSOCKET_RECONNECT],
    function* (action: RoomInitAction | WebSocketCloseAction) {
      const { dispatch } = action;
      const port = process.env.NODE_ENV === 'development' ? '8080' : window.location.port;
      const webSocketUrl = `ws://${window.location.hostname}:${port}`;
      const ws: WebSocket = yield new WebSocket(webSocketUrl);

      ws.addEventListener('open', () => dispatch(webSocketOpen(ws)));
      ws.addEventListener('message', ({ data }) => dispatch(webSocketMessage(data)));
      ws.addEventListener('error', () => dispatch(webSocketError()));
      ws.addEventListener('close', () => dispatch(webSocketClose(dispatch)));
    }
  );
}

function* registerMyUser() {
  yield takeEvery(WEBSOCKET_OPEN, function* () {
    const webSocket: WebSocket = yield select(getWebSocket);
    const myUserId: string = yield select(getMyUserId);
    const users: UserInterface[] = yield select(getAllUsers);
    const myUser = users.find(user => user.id === myUserId);

    if (myUser) {
      webSocket.send(JSON.stringify({
        data: myUser,
        type: 'my-user',
      } as WebSocketMessageDataInterface));
      yield put(webSocketRegisterUser(myUserId));
    }
  });
}

function* respondToMessages() {
  yield takeEvery(WEBSOCKET_MESSAGE, function* (action: WebSocketMessageAction) {
    const parseData: WebSocketMessageDataInterface = JSON.parse(String(action.message));

    if (parseData) {
      switch (parseData.type) {
        case 'users': {
          yield put(usersSaveUsers([...(parseData.data as UserInterface[])]));
          break;
        }
        case 'user': {
          const user: UserInterface = { ...parseData.data as UserInterface };
          const users: UserInterface[] = yield select(getAllUsers);
          const userIndex = users.findIndex(data => data.id === user.id);

          yield put(usersSaveUsers(userIndex > -1
            ? users.map(data => data.id !== user.id ? data : { ...user })
            : [...users, { ...user }]
          ));
          break;
        }
      }
    }
  });
}

function* reconnectOnClose() {
  yield takeEvery(WEBSOCKET_CLOSE, function* (action: WebSocketCloseAction) {
    yield delay(5000);
    yield put(webSocketReconnect(action.dispatch));
  });
}

export default [
  connectToServer(),
  registerMyUser(),
  respondToMessages(),
  reconnectOnClose(),
];
