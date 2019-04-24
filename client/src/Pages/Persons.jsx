import React, { Component } from 'react';
import { BrowserRouter as Link } from "react-router-dom";
import UserProfile from '../Pages/UserProfile';

class Persons extends Component {
  componentDidMount() {
    this.props.getPersons()
  }
  render() {
    // get persons for logged in user
    const judgees = this.props.judgees.map( (judgee, i) => {
      return <p key={i}><Link to={judgee}>{judgee.name}</Link></p>
    })
    return (
      
      <div className="Persons">
        <h1>Your Judgees:</h1>
          {judgees}
          {<UserProfile />}
      </div>
  )}
}
  
export default Persons;