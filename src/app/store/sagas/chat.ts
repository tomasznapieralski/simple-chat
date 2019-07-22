import { takeEvery, select, put } from 'redux-saga/effects';
import uuid from 'uuid';

import { MessageInterface } from '../interfaces/messages';

import {
  CHAT_SUBMIT_TEXT,
  ChatSubmitTextAction,
  chatSaveMessages,
  CHAT_MESSAGE_RENDERED,
  CHAT_DELETE_MESSAGE,
  ChatDeleteMessageAction,
  CHAT_EDIT_MESSAGE,
  ChatEditMessageAction,
} from '../actions/chat';

import { getMessages } from '../selectors/chat';
import { getMyUserId } from '../selectors/users';

function* createMessage() {
  yield takeEvery(CHAT_SUBMIT_TEXT, function* (action: ChatSubmitTextAction) {
    const messages: MessageInterface[] = yield select(getMessages);
    const myUserId: string = yield select(getMyUserId);
    const newMessage: MessageInterface = {
      timestamp: Date.now(),
      id: uuid(),
      text: action.text,
      userId: myUserId,
      status: 'created',
    };

    yield put(chatSaveMessages([
      ...messages,
      newMessage,
    ]));
  });
}

function* editMessage() {
  yield takeEvery(CHAT_EDIT_MESSAGE, function* (action: ChatEditMessageAction) {
    const messages: MessageInterface[] = yield select(getMessages);
    const targetMessageIndex = messages.findIndex(message => message.id === action.id);

    if (targetMessageIndex > -1) {
      const newMessages = [...messages];

      newMessages[targetMessageIndex] = {
        ...newMessages[targetMessageIndex],
        text: action.text,
        status: 'edited',
      };

      yield put(chatSaveMessages(newMessages));
    }
  });
}

function* deleteMessage() {
  yield takeEvery(CHAT_DELETE_MESSAGE, function* (action: ChatDeleteMessageAction) {
    const messages: MessageInterface[] = yield select(getMessages);
    const targetMessageIndex = messages.findIndex(message => message.id === action.id);

    if (targetMessageIndex > -1) {
      const newMessages = [...messages];

      newMessages[targetMessageIndex] = {
        ...newMessages[targetMessageIndex],
        text: '',
        status: 'deleted',
      };

      yield put(chatSaveMessages(newMessages));
    }
  });
}

function* scrollToBottom() {
  yield takeEvery(CHAT_MESSAGE_RENDERED, function* () {
    yield window.scroll(0, window.innerHeight);
  });
}

export default [
  createMessage(),
  editMessage(),
  deleteMessage(),
  scrollToBottom(),
];
