import { Action } from 'redux';

import { MessageInterface } from '../interfaces/messages';

const prefix = '[CHAT]';

export const CHAT_SUBMIT_TEXT = `${prefix} SUBMIT_TEXT`;
export const CHAT_SAVE_MESSAGES = `${prefix} SAVE_MESSAGES`;
export const CHAT_MESSAGE_RENDERED = `${prefix} MESSAGE_RENDERED`;

export interface ChatSubmitTextAction extends Action {
  text: string;
}

export interface ChatSaveMessagesAction extends Action {
  messages: MessageInterface[];
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
