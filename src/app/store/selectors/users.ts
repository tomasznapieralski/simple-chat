import { AppStateInterface } from '../reducers/index';

export const getAllUsers = (state: AppStateInterface) => state.users.data;

export const getActiveUsers = (state: AppStateInterface) =>
  state.users.data.filter(user => user.active);

export const getMyUserId = (state: AppStateInterface) => state.users.myUserId;
