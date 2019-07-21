import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { AppStateInterface } from '../../../../store/reducers';

import { MessageInterface } from '../../../../store/interfaces/messages';
import { UserInterface } from '../../../../store/interfaces/users';

import { getMyUserId, getAllUsers } from '../../../../store/selectors/users';
import { getMessages } from '../../../../store/selectors/chat';

import Message from './components/message/message';

import './chat.scss';

interface PropsInterface {
  messages: MessageInterface[];
  users: UserInterface[];
  myUserId: string | null;
}

const Chat: React.FC<PropsInterface> = ({
  messages,
  myUserId,
  users,
}) => {
  return (
    <div className="chat">
      {messages.map((message) =>
        <div
          className="chat__message"
          key={message.id}
        >
          <Message
            message={message}
            users={users}
            actionsAllowed={message.userId === myUserId}
          />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state: AppStateInterface) => ({
  messages: getMessages(state),
  myUserId: getMyUserId(state),
  users: getAllUsers(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
