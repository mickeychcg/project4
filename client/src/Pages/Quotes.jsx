import React, { Component } from 'react';
import { BrowserRouter as Link } from "react-router-dom";

class Quotes extends Component {
  componentDidMount() {
    this.props.getQuotes()
  }
  render() {
    // get persons for logged in user
    const remarks = this.props.remarks.map( (remark, i) => {
      return <p key={i}><Link to={remark}>{remark.name}</Link></p>
    })
    return (
      
      <div>
        <h1>Your Remarks:</h1>
          {remarks}
      </div>
  )}
}
  
export default Quotes;