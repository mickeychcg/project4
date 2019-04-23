import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Persons from './Persons';
// import PersonalityInsightsV3 from 'PersonalityInsightsV3';

// get results from watson and display raw scores here
// send raw scores to dataviz api to bring back radial chart 

const Analysis = props => {
  return (
    <div className="analysis">
      <h1>Analysis</h1>
    </div>
  )
}

// class Analysis extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//         quotes: []
//     }
//   }
//   componentDidMount() {
//     let user = this.props.user
//     axios.get(`/api/user/${user._id}/persons/`).then(res => {
//       this.setState({
//         quotes: res.data
//       });
//     });
//   } 
  
//   selectQuotes() {
//     let pid = this.props.person._id
//     axios.get(`/${pid}/quotes`)
//     .then(res => {
//     this.setState({
//         quotes: res.data
//     })
//   })
// }
//   render () {
//     const quotes = map( (quote, i) => {
//       return <p key={i}>{person._id.quote} </p>
//     })
//   // if (quotes.user._id === user.id) {
//   //   return <p>quotes.name</p>
//   // }
//     return(
// <h1>Analysis</h1>
//   )}
// }

export default Analysis;