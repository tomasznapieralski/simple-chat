import { AppStateInterface } from '../reducers/index';

export const getData = (state: AppStateInterface) => state.users.data;

export const getMyUserId = (state: AppStateInterface) => state.users.myUserId;
