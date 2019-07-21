import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store/store';

import Chat from './routes/chat/chat';

import './app.scss';

const App: React.FC = () => {
  return (
    <Provider store={store()}>
      <Router>
        <Switch>
          <Route path="/chat" component={Chat} />
          <Redirect to="/chat" />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
