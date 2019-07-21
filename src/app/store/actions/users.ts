import { Action } from 'redux';

import { UserInterface } from '../interfaces/users';

const prefix = '[USERS]';

export const USERS_SAVE_MY_USER_ID = `${prefix} SAVE_MY_USER_ID`;
export const USERS_SAVE_USERS = `${prefix} SAVE_USERS`;

export interface UsersSaveMyUserIdAction extends Action {
  id: string;
}

export interface UsersSaveUsersAction extends Action {
  users: UserInterface[];
}

export const usersSaveMyUserId = (id: string): UsersSaveMyUserIdAction => ({
  type: USERS_SAVE_MY_USER_ID,
  id,
});

export const usersSaveUsers = (users: UserInterface[]): UsersSaveUsersAction => ({
  type: USERS_SAVE_USERS,
  users,
});
