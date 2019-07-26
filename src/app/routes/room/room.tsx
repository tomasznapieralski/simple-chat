import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Redirect, Switch, Route } from 'react-router';
import { NavLink } from 'react-router-dom';

import { AppStateInterface } from '../../store/reducers';

import { getMyUserId, getActiveUsers } from '../../store/selectors/users';

import { UserInterface } from '../../store/interfaces/users';

import { roomInit, RoomInitAction } from '../../store/actions/room';

import Participants from './routes/participants/participants';
import Chat from './routes/chat/chat';

import './room.scss';

interface PropsInterface {
  myUserId: string | null;
  users: UserInterface[];
  initAction: () => RoomInitAction;
}

const Room: React.FC<PropsInterface> = ({
  myUserId,
  users,
  initAction,
}) => {
  useEffect(() => {
    myUserId && initAction();
  }, [initAction, myUserId]);

  return (
    <div className="room">
      {!myUserId && <Redirect to="/welcome" />}
      {myUserId &&
        <React.Fragment>
          <div className="room__title">
            Status Meeting Standup
          </div>
          <div className="room__tabs">
            <NavLink
              className="room__tabs-item"
              activeClassName="room__tabs-item--active"
              to="/room/participants"
            >
              Participants ({users.length})
            </NavLink>
            <NavLink
              className="room__tabs-item"
              activeClassName="room__tabs-item--active"
              to="/room/chat"
            >
              Chat
            </NavLink>
          </div>
          <div className="room__router-outlet">
            <Switch>
              <Route
                path="/room/participants"
                component={Participants}
              />
              <Route
                path="/room/chat"
                component={Chat}
              />
              <Redirect to="/room/chat" />
            </Switch>
          </div>
        </React.Fragment>
      }
    </div>
  );
}

const mapStateToProps = (state: AppStateInterface) => ({
  myUserId: getMyUserId(state),
  users: getActiveUsers(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  initAction: () => dispatch(roomInit(dispatch)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Room);
