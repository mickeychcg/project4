import React from 'react';

import Home from './Pages/Home';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import {UserContextProvider} from './Contexts/UserContext';

import './App.css';

function App(props) {
  return (
    <Router>
      <UserContextProvider>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </UserContextProvider>
    </Router>
  );
}

export default App;