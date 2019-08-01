import React, {useContext} from 'react';
import {Link, Switch, Route} from 'react-router-dom';

import UserContext from '../Contexts/UserContext';
import {SpeakersContextProvider} from '../Contexts/SpeakersContext';

import Landing from './Landing';
import Login from './Login';
import Speakers from './Speakers';

import '../App.css';

function Home(props) {
  const userContext = useContext(UserContext);

  return (
    <div>
      <SpeakersContextProvider>
        <nav className='nav'>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/speakers">Speakers</Link></li>
            {userContext.user &&
              <li><a onClick={userContext.logout}>Logout</a></li>
            }
          </ul>
        </nav>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          {userContext.user && <Route path="/speakers" component={Speakers} />}
          <Route render={() => <div>404</div>} />
        </Switch>
      </SpeakersContextProvider>
    </div>
  );
}

export {Home as default};