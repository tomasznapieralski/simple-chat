import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store/store';

import Welcome from './routes/welcome/welcome';
import Room from './routes/room/room';

import './app.scss';

const App: React.FC = () => {
  return (
    <Provider store={store()}>
      <Router>
        <Switch>
          <Route path="/welcome" component={Welcome} />
          <Route path="/room" component={Room} />
          <Redirect to="/welcome" />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
