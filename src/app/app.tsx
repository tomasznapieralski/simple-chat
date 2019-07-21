import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store/store';

import Welcome from './routes/welcome/welcome';
import Chat from './routes/chat/chat';

import './app.scss';

const App: React.FC = () => {
  return (
    <Provider store={store()}>
      <Router>
        <Switch>
          <Route path="/welcome" component={Welcome} />
          <Route path="/chat" component={Chat} />
          <Redirect to="/welcome" />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
