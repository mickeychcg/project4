import React from 'react';
import UserProfile from '../Components/UserProfile';
import Login from '../Components/Login';
import SpeakerContainer from '../Components/SpeakerContainer';
import Speakers from './Speakers';
// import { PromiseProvider } from 'mongoose';

const Home = (props) => {
  return (
    <div className='LandingPage'>
      <section className='brand-statement'>
        <h2 className='brand-font'>Judge-O-Matic</h2>
        <h3>Go ahead. Be Judgey.</h3>
        <div className="loginSignup">
        
      {/* <Speakers judgees={props.judgees} getSpeakers={props.getSpeakers}/> */}
      <UserProfile user={props.user} logout={props.logout} />
        </div>
      </section>
    </div>
  )
}

export default Home;