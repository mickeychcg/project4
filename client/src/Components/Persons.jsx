import React, { Component } from 'react';
import axios from 'axios';
import UserProfile from '../UserProfile';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";



class Persons extends Component {
  constructor(props) {
    super(props);
    this.state={
      persons: [],
      personalities: [],
      quotes: []
    };
  }
  componentDidMount() {
    let user = this.props.user
    axios.get(`/api/user/${user._id}/persons`).then(res => {
      this.setState({
        persons: res.data
      });
    });
  }
  
  // Set a variable to hold a block of text pasted into a textarea
  render() {
    const person = this.state.persons ?
    this.state.persons.map( (person, i) => (
      <p key={i}>{person.name} </p> 
    )): '';
  return (
      <div>
        <h1>Persons:</h1>
        {person}
      </div>
  )}
  
}




export default Persons;