import React from 'react';
import Persons from '../Pages/Persons';
import PersonForm from './PersonForm';
import UserProfile from './UserProfile';

const PersonContainer = (props) => {
  return (
    <>
    <p>I AM THE PERSON CONTAINER!!!!!!!! RAWR</p>
    <div className="Persons">
      <Persons judgees={props.judgees} getPerson={props.getPersons} />
      <PersonForm addPerson={props.addPerson} />
    </div>
      <UserProfile user={props.user} logout={props.logout} />
    </>
  )
}

export default PersonContainer;