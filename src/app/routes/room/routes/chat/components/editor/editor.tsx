import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import { ChatSubmitTextAction } from '../../../../../../store/actions/chat';

import './editor.scss';

interface PropsInterface {
  textSubmitHandler: (text: string) => ChatSubmitTextAction;
}

const Editor: React.FC<PropsInterface> = ({ textSubmitHandler }) => {
  const [text, setText] = useState('');

  return (
    <form
      className="editor"
      onSubmit={(event) => {
        const trimmedText = text.trim();

        event.preventDefault();

        if (trimmedText.length > 0) {
          textSubmitHandler(trimmedText);
          setText('');
        }
      }}
    >
      <textarea
        className="editor__textarea"
        onChange={(event) => setText(event.target.value)}
        value={text}
      ></textarea>
      <button
        className="editor__icon"
        type="submit"
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </form>
  );
}

export default Editor;
