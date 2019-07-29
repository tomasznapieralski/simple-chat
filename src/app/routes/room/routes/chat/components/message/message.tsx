import React, { useEffect, useState } from 'react';
import { Action } from 'redux';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

import { MessageInterface } from '../../../../../../store/interfaces/messages';
import { UserInterface } from '../../../../../../store/interfaces/users';

import {
  ChatDeleteMessageAction,
  ChatEditMessageAction,
} from '../../../../../../store/actions/chat';

import './message.scss';

interface PropsInterface {
  message: MessageInterface;
  users: UserInterface[];
  actionsAllowed: boolean;
  initHandler: () => Action;
  editHandler: (id: string, text: string) => ChatEditMessageAction;
  deleteHandler: (id: string) => ChatDeleteMessageAction;
}

const Message: React.FC<PropsInterface> = ({
  message,
  users,
  actionsAllowed,
  initHandler,
  editHandler,
  deleteHandler,
}) => {
  const { userId, text, timestamp, id, status } = message;
  const user = users.find(user => user.id === userId);
  const name = (user && user.name) || 'Anonymous';
  const dateFromTimestamp = new Date(timestamp);
  const time = `${dateFromTimestamp.getHours()}:${dateFromTimestamp.getMinutes()}`;

  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState('');

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
          {status === 'edited' &&
            <div className="message__header-status">
              - Edited -
            </div>
          }
        </div>
        {text && !editMode &&
          <div className={classNames('message__text', { 'message__text--bot': (user && user.isBot) })}>
            {text}
          </div>
        }
        {editMode &&
          <textarea
            className="message__textarea"
            value={editText}
            onChange={(event) => setEditText(event.target.value)}
          ></textarea>
        }
        {status === 'deleted' &&
          <div className="message__text message__text--deleted">
            Message was deleted...
          </div>
        }
      </div>
      {actionsAllowed && !editMode && status !== 'deleted' &&
        <div className="message__header-actions">
          <button
            className="message__header-actions-item"
            type="button"
            onClick={() => {
              setEditText(text);
              setEditMode(true);
            }}
          >
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
      {editMode &&
        <div className="message__header-actions">
          <button
            className="message__header-actions-item"
            type="button"
            onClick={() => {
              const trimmedEditText = editText.trim();

              setEditMode(false);

              if (trimmedEditText.length > 0 && trimmedEditText !== text) {
                editHandler(id, trimmedEditText);
              }
            }}
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button
            className="message__header-actions-item"
            type="button"
            onClick={() => setEditMode(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      }
    </div>
  );
}

export default Message;
