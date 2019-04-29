import React, { Component } from 'react';
import { BrowserRouter as NavLink } from "react-router-dom";

class Quotes extends Component {
  componentDidMount() {
    this.props.getQuotes()
  }
  render() {
    // get quotes for logged in user
    const quotes = this.props.quotes.map( (quote, i) => {
      return <p key={i}><NavLink to={() => {this.props.getPersons(quote._id)}} > {quote} </NavLink> </p>
    })
    return (
      
      <div>
        <h1>Your Remarks:</h1>
          {quotes}
      </div>
    )
  }
}
  
export default Quotes;