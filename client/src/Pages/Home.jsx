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
  console.log('Home');

  return (
    <div>
      <SpeakersContextProvider>
        <nav className='nav'>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/speakers">Speakers</Link></li>
            {userContext.user &&
              <li><a onClick={userContext.logout}>Logout</a></li>
            }
          </ul>
        </nav>
          <Route exact path="/" component={Landing} />
          {userContext.user && <Route path="/speakers" component={Speakers} />}
      </SpeakersContextProvider>
    </div>
  );
}

export {Home as default};