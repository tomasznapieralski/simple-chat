import { Action } from 'redux';

import { MessageInterface } from '../interfaces/messages';

import {
  CHAT_SAVE_MESSAGES,
  ChatSaveMessagesAction,
} from '../actions/chat';

export interface ChatReducerInterface {
  messages: MessageInterface[];
}

const defaultState: ChatReducerInterface = {
  messages: [],
};

export default (state = defaultState, action: Action): ChatReducerInterface => {
  switch (action.type) {
    case CHAT_SAVE_MESSAGES: {
      return {
        ...state,
        messages: [...(action as ChatSaveMessagesAction).messages]
      };
    }
    default: {
      return state;
    }
  }
};
