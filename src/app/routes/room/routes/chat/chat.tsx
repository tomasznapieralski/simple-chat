import React from 'react';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';

import { AppStateInterface } from '../../../../store/reducers';

import { MessageInterface } from '../../../../store/interfaces/messages';
import { UserInterface } from '../../../../store/interfaces/users';

import { getMyUserId, getAllUsers } from '../../../../store/selectors/users';
import { getMessages } from '../../../../store/selectors/chat';

import {
  chatSubmitText,
  ChatSubmitTextAction,
  chatMessageRendered,
  chatDeleteMessage,
  ChatDeleteMessageAction,
  chatEditMessage,
  ChatEditMessageAction,
} from '../../../../store/actions/chat';

import Message from './components/message/message';
import Editor from './components/editor/editor';

import './chat.scss';

interface PropsInterface {
  messages: MessageInterface[];
  users: UserInterface[];
  myUserId: string | null;
  submitTextAction: (text: string) => ChatSubmitTextAction;
  messageRenderedAction: () => Action;
  deleteMessageAction: (id: string) => ChatDeleteMessageAction;
  editMessageAction: (id: string, text: string) => ChatEditMessageAction;
}

const Chat: React.FC<PropsInterface> = ({
  messages,
  myUserId,
  users,
  submitTextAction,
  messageRenderedAction,
  deleteMessageAction,
  editMessageAction,
}) => {
  return (
    <div className="chat">
      <div className="chat__messages">
        {messages.map((message) =>
          <div
            className="chat__messages-item"
            key={message.id}
          >
            <Message
              message={message}
              users={users}
              actionsAllowed={message.userId === myUserId}
              initHandler={messageRenderedAction}
              deleteHandler={deleteMessageAction}
              editHandler={editMessageAction}
            />
          </div>
        )}
      </div>
      <div className="chat__editor">
        <Editor textSubmitHandler={submitTextAction} />
      </div>
    </div>
  );
}

const mapStateToProps = (state: AppStateInterface) => ({
  messages: getMessages(state),
  myUserId: getMyUserId(state),
  users: getAllUsers(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  submitTextAction: (text: string) => dispatch(chatSubmitText(text)),
  messageRenderedAction: () => dispatch(chatMessageRendered()),
  deleteMessageAction: (id: string) => dispatch(chatDeleteMessage(id)),
  editMessageAction: (id: string, text: string) => dispatch(chatEditMessage(id, text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
