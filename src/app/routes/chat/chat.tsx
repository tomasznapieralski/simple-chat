import React, { useEffect } from 'react';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { AppStateInterface } from '../../store/reducers';

import { getMyUserId} from '../../store/selectors/users';

import './chat.scss';

interface PropsInterface {
  myUserId: string | null;
}

const Chat: React.FC<PropsInterface> = ({ myUserId }) => {
  return (
    <div className="chat">
      {!myUserId && <Redirect to={'/welcome'} />}
      xxx
    </div>
  );
}

const mapStateToProps = (state: AppStateInterface) => ({
  myUserId: getMyUserId(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
