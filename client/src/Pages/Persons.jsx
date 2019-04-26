import React, { Component } from 'react';
import { BrowserRouter as Link, NavLink } from "react-router-dom";
import UserProfile from '../Components/UserProfile';

class Persons extends Component {
  componentDidMount() {
    this.props.getPersons()
  }
  render() {
    // get persons for logged in user
    const judgees = this.props.judgees.map( (judgee, i) => {
      return <p key={i}><NavLink to={judgee}>{judgee.name}</NavLink></p>
    })
    return (
      
      <div className="Persons">
        <h1>Your Judgees:</h1>
          {judgees}
          <div className="UserProfile">
          {<UserProfile />}
      </div>
      </div>
  )}
}
  
export default Persons;