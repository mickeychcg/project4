import React from 'react';

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
    <input type="text" name="name" placeholder="Enter a New Judgee" id="" />
      <input type="submit" value="Add New Judgee" />
  </form>
  )
}

export default PersonForm;