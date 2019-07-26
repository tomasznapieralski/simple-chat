import { combineReducers } from 'redux';

import usersReducer from './users';
import chatReducer from './chat';
import webSocketReducer from './websocket';

const rootReducer = combineReducers({
  users: usersReducer,
  chat: chatReducer,
  webSocket: webSocketReducer,
});

export type AppStateInterface = ReturnType<typeof rootReducer>;

export default rootReducer;
