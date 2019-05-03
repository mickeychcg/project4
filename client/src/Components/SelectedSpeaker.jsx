import React from 'react';
// import Speakers from './Pages/Speakers';

const SelectedSpeaker = (props) => {
  console.log("Are these the props I'm looking for?", props)
  return (
    <div className="Speakers">
        <h1>Your Speakers:</h1>
          {props.selectedSpeaker}
            <div className="UserProfile">
          {/* {<UserProfile />} */}
            </div>
    </div>
    )
  }
export default SelectedSpeaker;