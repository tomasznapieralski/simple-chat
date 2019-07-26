import { Action } from 'redux';

import { UserInterface } from '../interfaces/users';

import {
  USERS_SAVE_MY_USER_ID,
  USERS_SAVE_USERS,
  UsersSaveMyUserIdAction,
  UsersSaveUsersAction,
} from '../actions/users';

export interface UsersReducerInterface {
  data: UserInterface[];
  myUserId: string | null;
}

const defaultState: UsersReducerInterface = {
  data: [],
  myUserId: null,
};

export default (state = defaultState, action: Action): UsersReducerInterface => {
  switch (action.type) {
    case USERS_SAVE_USERS: {
      return {
        ...state,
        data: [...(action as UsersSaveUsersAction).users],
      };
    }
    case USERS_SAVE_MY_USER_ID: {
      return {
        ...state,
        myUserId: (action as UsersSaveMyUserIdAction).id,
      };
    }
    default: {
      return state;
    }
  }
};
