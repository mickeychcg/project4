import React from 'react';
import Speakers from '../Pages/Speakers';
import SpeakerForm from './SpeakerForm';
import UserProfile from './UserProfile';

const SpeakerContainer = (props) => {
  return (
    <>
    <p>I AM THE PERSON CONTAINER!!!!!!!! RAWR</p>
    <div className="Speakers">
      <Speakers judgees={props.judgees} getSpeaker={props.getSpeakers} />
      <SpeakerForm addSpeaker={props.addSpeaker} />
    </div>
      <UserProfile user={props.user} logout={props.logout} />
    </>
  )
}

export default SpeakerContainer;