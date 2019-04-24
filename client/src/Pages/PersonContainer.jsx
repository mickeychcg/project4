import React from 'react';
import Persons from '../Pages/Persons';
import PersonForm from '../Components/PersonForm';

const PersonContainer = (props) => {
  return (
    <>
    <p>I AM THE PERSON CONTAINER!!!!!!!! RAWR</p>
    <div className="Persons">
      <Persons judgees={props.judgees} getPersons={props.getPersons} logout={props.logout} />
    </div>
    <PersonForm addPerson={props.addPerson} />
    </>
  )
}

export default PersonContainer;