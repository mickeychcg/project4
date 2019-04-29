import React, { Component } from 'react';
import { Link } from "react-router-dom";
import UserProfile from '../Components/UserProfile';

class Persons extends Component {
  selectJudgee(judgee) {
    this.props.selectJudgee(judgee) 
  }
  componentDidMount() {
    this.props.getPersons()
  }
  render() {
    // get persons for logged in user
    const judgees = this.props.judgees.map( (judgee, i) => {
      return <p key={i}><Link onClick={() => this.selectJudgee(judgee)} to={`/persons/${judgee._id}`}>{judgee.name}</Link></p>
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