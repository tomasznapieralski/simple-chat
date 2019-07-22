import React, { useEffect } from 'react';
import { Action } from 'redux';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { MessageInterface } from '../../../../../../store/interfaces/messages';
import { UserInterface } from '../../../../../../store/interfaces/users';

import { ChatDeleteMessageAction } from '../../../../../../store/actions/chat';

import './message.scss';

interface PropsInterface {
  message: MessageInterface;
  users: UserInterface[];
  actionsAllowed: boolean;
  initHandler: () => Action;
  // editHandler: () => void;
  deleteHandler: (id: string) => ChatDeleteMessageAction;
}

const Message: React.FC<PropsInterface> = ({
  message,
  users,
  actionsAllowed,
  initHandler,
  deleteHandler,
}) => {
  const {
    userId,
    text,
    timestamp,
    id,
    status,
  } = message;
  const user = users.find(user => user.id === userId);
  const name = (user && user.name) || 'Anonymous';
  const dateFromTimestamp = new Date(timestamp);
  const time = `${dateFromTimestamp.getHours()}:${dateFromTimestamp.getMinutes()}`;

  useEffect(() => {
    initHandler();
  }, [initHandler]);

  return (
    <div className="message">
      <div className={classNames('message__content', { 'message__content--owner': actionsAllowed })}>
        <div className="message__header">
          <div className="message__header-name">
            {name}
          </div>
          <div className="message__header-time">
            {time}
          </div>
        </div>
        {text &&
          <div className="message__text">
            {text}
          </div>
        }
        {status === 'deleted' &&
          <div className="message__text message__text--deleted">
            Message was deleted...
          </div>
        }
      </div>
      {actionsAllowed && status !== 'deleted' &&
        <div className="message__header-actions">
          <button className="message__header-actions-item">
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            className="message__header-actions-item"
            type="button"
            onClick={() => deleteHandler(id)}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      }
    </div>
  );
}

export default Message;
