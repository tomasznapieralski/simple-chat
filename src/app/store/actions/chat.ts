import { Action } from 'redux';

import { MessageInterface } from '../interfaces/messages';

const prefix = '[CHAT]';

export const CHAT_SUBMIT_TEXT = `${prefix} SUBMIT_TEXT`;
export const CHAT_SAVE_MESSAGES = `${prefix} SAVE_MESSAGES`;
export const CHAT_MESSAGE_RENDERED = `${prefix} MESSAGE_RENDERED`;
export const CHAT_DELETE_MESSAGE = `${prefix} DELETE_MESSAGE`;
export const CHAT_EDIT_MESSAGE = `${prefix} EDIT_MESSAGE`;

export interface ChatSubmitTextAction extends Action {
  text: string;
}

export interface ChatSaveMessagesAction extends Action {
  messages: MessageInterface[];
}

export interface ChatDeleteMessageAction extends Action {
  id: string;
}

export interface ChatEditMessageAction extends Action {
  id: string;
  text: string;
}

export const chatSubmitText = (text: string): ChatSubmitTextAction => ({
  type: CHAT_SUBMIT_TEXT,
  text,
});

export const chatSaveMessages = (messages: MessageInterface[]): ChatSaveMessagesAction => ({
  type: CHAT_SAVE_MESSAGES,
  messages,
});

export const chatMessageRendered = (): Action => ({
  type: CHAT_MESSAGE_RENDERED,
});

export const chatDeleteMessage = (id: string): ChatDeleteMessageAction => ({
  type: CHAT_DELETE_MESSAGE,
  id,
});

export const chatEditMessage = (id: string, text: string): ChatEditMessageAction => ({
  type: CHAT_EDIT_MESSAGE,
  id,
  text,
});
