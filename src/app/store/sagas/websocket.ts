import { takeEvery, select, delay, put } from 'redux-saga/effects';

import { UserInterface } from '../interfaces/users';
import { WebSocketMessageDataInterface } from '../interfaces/websockets';
import { MessageInterface } from '../interfaces/messages';

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
  WEBSOCKET_SEND_CHAT_MESSAGE,
  WebSocketSendChatMessageAction,
} from '../actions/websocket';
import { usersSaveUsers } from '../actions/users';
import { chatSaveMessages } from '../actions/chat';

import { getMyUserId, getAllUsers } from '../selectors/users';
import { getWebSocket } from '../selectors/websocket';
import { getMessages } from '../selectors/chat';

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
      webSocket.send(btoa(JSON.stringify({
        data: myUser,
        type: 'my-user',
      } as WebSocketMessageDataInterface)));
      yield put(webSocketRegisterUser(myUserId));
    }
  });
}

function* sendChatMessages() {
  yield takeEvery(WEBSOCKET_SEND_CHAT_MESSAGE, function* (action: WebSocketSendChatMessageAction) {
    const webSocket: WebSocket = yield select(getWebSocket);

    webSocket.send(btoa(JSON.stringify({
      data: action.message,
      type: 'message',
    } as WebSocketMessageDataInterface)));
  });
}

function* respondToMessages() {
  yield takeEvery(WEBSOCKET_MESSAGE, function* (action: WebSocketMessageAction) {
    const parseData: WebSocketMessageDataInterface = JSON.parse(atob(String(action.message)));

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
        case 'messages': {
          yield put(chatSaveMessages([...(parseData.data as MessageInterface[])]));
          break;
        }
        case 'message': {
          const message: MessageInterface = { ...parseData.data as MessageInterface };
          const myUserId: string = yield select(getMyUserId);

          if (message.userId !== myUserId) {
            const messages: MessageInterface[] = yield select(getMessages);
            const messageIndex = messages.findIndex(data => data.id === message.id);

            yield put(chatSaveMessages(messageIndex > -1
              ? messages.map(data => data.id !== message.id ? data : { ...message })
              : [...messages, { ...message }]
            ));
          }

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
  sendChatMessages(),
  respondToMessages(),
  reconnectOnClose(),
];
