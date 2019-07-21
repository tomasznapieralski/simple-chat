import { combineReducers } from 'redux';

import usersReducer from './users';
import chatReducer from './chat';

const rootReducer = combineReducers({
  users: usersReducer,
  chat: chatReducer,
});

export type AppStateInterface = ReturnType<typeof rootReducer>;

export default rootReducer;
