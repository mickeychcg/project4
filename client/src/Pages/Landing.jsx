import React from 'react';
import Login from '../Components/Login';

const Home = () => {
  return (
    <div className='LandingPage'>
      <section className='brand-statement'>
        <h2 className='brand-font'>Judge-O-Matic</h2>
        <h3>Go ahead. Be Judgey.</h3>
      </section>
      <Login />
    </div>
  );
};

export default Home;