import React from 'react';
import { connect } from 'react-redux';

import { AppStateInterface } from '../../../../store/reducers';

import { getData} from '../../../../store/selectors/users';

import { UserInterface } from '../../../../store/interfaces/users';

import './participants.scss';

interface PropsInterface {
  users: UserInterface[];
}

const Participants: React.FC<PropsInterface> = ({ users }) => {
  return (
    <ul className="participants">
      {users.map(({ name, id }) =>
        <li
          className="participants__item"
          key={id}
        >
          {name}
        </li>
      )}
    </ul>
  );
}

const mapStateToProps = (state: AppStateInterface) => ({
  users: getData(state),
});

export default connect(mapStateToProps)(Participants);
