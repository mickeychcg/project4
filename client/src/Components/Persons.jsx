import React, { Component } from 'react';
import { BrowserRouter as Link } from "react-router-dom";
import axios from 'axios';
import Analysis from './Analysis';

class Persons extends Component {
  render() {
    // console.log("HEY! What about Adding a New Person, huh?", this.props.addNewPerson)
    const persons = this.props.persons.map( (person, i) => {
      return <a href="#" key={i}> <br/>{(person.name)}
      </a>
        // <button onClick={this.props.addNewPerson}>
        // Click me
        // </button>

      

      // <a href={`/customer/${item._id}`} >{item.get('firstName')} {item.get('lastName')}</a>

      // let content;
      // if (this.state.currentPerson != null) {
      //   content = <Analysis persons={this.state.currentPerson} backToPersons={this.backToPersons}/>
      // } else {
      //   content = 
      //   (
      //     <>
      //     <h2> Person Quotes </h2>
      //     <ul>
      //     {persons}
      //     </ul>
      //     </>
      //   )
      // }
    })
    return (
      
      <div>
        <h1>Persons:</h1>
        <Link to ={`/api/persons${persons}`}>
          {persons}
        </Link>
      </div>
  )}
}
  
export default Persons;