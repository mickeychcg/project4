import React from 'react';
import Speakers from '../Pages/Speakers';
import SpeakerForm from './SpeakerForm';
import UserProfile from './UserProfile';

const SpeakerContainer = (props) => {
  console.log("Where are the speakers", props.speakers)
  return (
    <>
    <p>I AM THE SPEAKER CONTAINER!!!!!!!! RAWR</p>
    <div className="Speakers">
      <SpeakerForm addSpeaker={props.addSpeaker} />
      <Speakers speakers={props.speakers} />
      {/* <UserProfile user={props.user} /> */}
    </div>
    </>
  )
}

export default SpeakerContainer;