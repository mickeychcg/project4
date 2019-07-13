import React from 'react';

const UserProfile = props => {
  return (
    <div className="LandingPage">
      <div className='UserProfile'>
        <p>Hello, {props.user ? props.user.name : ''}</p>
          <button className='logout-btn' onClick={props.logout}>Log Out!</button>
      </div>
    </div>
  )
}

export default UserProfile;