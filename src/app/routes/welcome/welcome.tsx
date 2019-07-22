import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { AppStateInterface } from '../../store/reducers';

import { getMyUserId } from '../../store/selectors/users';

import {
  welcomeSubmitMyUserName,
  WelcomeSubmitMyUserNameAction,
} from '../../store/actions/welcome';

import './welcome.scss';

interface PropsInterface {
  myUserId: string | null;
  submitFormAction: (name: string) => WelcomeSubmitMyUserNameAction;
}

const Welcome: React.FC<PropsInterface> = ({
  myUserId,
  submitFormAction,
}) => {
  const [name, setName] = useState('');

  return (
    <div className="welcome">
      {myUserId && <Redirect to={'/room'} />}
      <div className="welcome__card">
        <div className="welcome__card-header">
          Welcome to the Chat App!
        </div>
        <div className="welcome__card-text">
          Please type your name and please the Join button to start a chat.
        </div>
        <form
          className="welcome__card-form"
          onSubmit={(event) => {
            const trimmedName = name.trim();

            event.preventDefault();

            submitFormAction(trimmedName || 'Anonymous');
          }}
        >
          <input
            className="welcome__card-form-input"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <button
            className="welcome__card-form-button"
            type="submit"
          >
            Join
          </button>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state: AppStateInterface) => ({
  myUserId: getMyUserId(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  submitFormAction: (name: string) => dispatch(welcomeSubmitMyUserName(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
