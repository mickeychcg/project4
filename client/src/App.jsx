import React from 'react';

import Home from './Pages/Home';
import Login from './Pages/Login';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import UserContext, {UserContextProvider} from './Contexts/UserContext';

import './App.css';

function App(props) {
  return (
    <Router>
      <UserContextProvider>
        <UserContext.Consumer>
          {userContext => {
            return (
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route render={() => <div>404</div>} />
              </Switch>
            );
          }}
        </UserContext.Consumer>
      </UserContextProvider>
    </Router>
  );
}

export default App;