import React from 'react';
import UserProfile from '../Components/UserProfile';
import Login from '../Components/Login';
import PersonContainer from '../Components/PersonContainer';
import Persons from './Persons';
// import { PromiseProvider } from 'mongoose';

const Home = (props) => {
  return (
    <div className='LandingPage'>
      <section className='brand-statement'>
        <h2 className='brand-font'>Judge-O-Matic</h2>
        <h3>Go ahead. Be Judgey.</h3>
        <div className="loginSignup">
        
      {/* <Persons judgees={props.judgees} getPersons={props.getPersons}/> */}
      <UserProfile user={props.user} logout={props.logout} />
        </div>
      </section>
    </div>
  )
}

export default Home;