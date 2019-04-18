import React, { Component } from 'react';
import axios, from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



class Home extends Component {
  constructor(props) {
    super(props);
    this.state={
      persons = [];
      personalities = [];
      quotes = [];
    };
  }
  componentDidMount() {
    axios.get(`/user/${users}/person/${this.props.persons._id}`).then(res => {
      this.setState({
        persons: res.data
      });
    });
  }
  
  
  // Set a variable to hold a block of text pasted into a textarea
  render() {
    <h1>This is a Person</h1>
  }
  
}
console.log("This is empty array persons", persons);




export default Home;