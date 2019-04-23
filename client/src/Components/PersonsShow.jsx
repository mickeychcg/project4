import React from 'react';
import axios from 'axios';
// import Analysis from './Analysis';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const PersonsShow = (props) => {
  let person = props.person.find((person) => {
    return person.id === (this.props.match.params.id)
    // return <li onClick={() => props.persons.name} key={index}>{props.persons.name}</li> 
    // return person.id === (props.match.params.id)
  })
  // console.log(props.match.params.id);
  return (
    <div>
      <h1>{person.name}</h1>
      <p>It hurts a lot!</p>
    </div>
  )
}



export default PersonsShow;