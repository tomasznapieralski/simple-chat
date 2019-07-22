import React, { useEffect } from 'react';
import { Action } from 'redux';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { MessageInterface } from '../../../../../../store/interfaces/messages';
import { UserInterface } from '../../../../../../store/interfaces/users';

import './message.scss';

interface PropsInterface {
  message: MessageInterface;
  users: UserInterface[];
  actionsAllowed: boolean;
  initHandler: () => Action;
  // editHandler: () => void;
  // deleteHandler: () => void;
}

const Message: React.FC<PropsInterface> = ({
  message,
  users,
  actionsAllowed,
  initHandler,
}) => {
  const {
    userId,
    text,
    timestamp,
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
        <div className="message__text">
          {text}
        </div>
      </div>
      {actionsAllowed &&
        <div className="message__header-actions">
          <div className="message__header-actions-item">
            <FontAwesomeIcon icon={faEdit} />
          </div>
          <div className="message__header-actions-item">
            <FontAwesomeIcon icon={faTrashAlt} />
          </div>
        </div>
      }
    </div>
  );
}

export default Message;
