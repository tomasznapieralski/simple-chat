import { combineReducers } from 'redux';

import usersReducer from './users';

const rootReducer = combineReducers({
  users: usersReducer,
});

export type AppStateInterface = ReturnType<typeof rootReducer>;

export default rootReducer;
