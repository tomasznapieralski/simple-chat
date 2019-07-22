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
  messages: [
    {
      id: '1',
      userId: 'xxx',
      text: 'oki doki',
      status: 'created',
      timestamp: 1563738084629,
    },
    {
      id: '2',
      userId: '720020be-b8f3-4aa6-bf97-aa2046af4d02',
      text: 'mniam mniam mniam mniam mniam mniam mniam mniam mniam mniam mniam mniam mniam mniam mniam mniam mniam mniam',
      status: 'created',
      timestamp: 1563738663426,
    },
    {
      id: '3',
      userId: 'xxx',
      text: 'omega super',
      status: 'created',
      timestamp: 1563740129070,
    },
  ],
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
