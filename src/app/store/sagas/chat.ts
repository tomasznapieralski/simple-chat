import { takeEvery, select, put } from 'redux-saga/effects';
import uuid from 'uuid';

import { MessageInterface } from '../interfaces/messages';

import {
  CHAT_SUBMIT_TEXT,
  ChatSubmitTextAction,
  chatSaveMessages,
  CHAT_MESSAGE_RENDERED,
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

function* scrollToBottom() {
  yield takeEvery(CHAT_MESSAGE_RENDERED, function* () {
    yield window.scroll(0, window.innerHeight);
  });
}

export default [
  createMessage(),
  scrollToBottom(),
];
