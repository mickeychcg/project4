import React from 'react';

const SpeakerForm = (props) => {
  return (
    <form onSubmit={props.addSpeaker}>
    <input type="text" name="name" placeholder="Enter a New Speaker" id="" />
      <input type="submit" value="Add New Speaker" />
  </form>
  )
}

export default SpeakerForm;