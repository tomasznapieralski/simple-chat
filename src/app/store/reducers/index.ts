import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  // reducers
});

export type AppStateInterface = ReturnType<typeof rootReducer>;

export default rootReducer;
