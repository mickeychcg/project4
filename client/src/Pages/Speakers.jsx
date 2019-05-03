import React, { Component } from 'react';
import { Link } from "react-router-dom";
import UserProfile from '../Components/UserProfile';

class Speakers extends Component {
  constructor (props) {
    super (props)
    this.state = {
      selectedSpeaker: null,
      selectedQuotes: []
    }
  }

  componentDidMount() {
    this.props.getSpeakers()
  }

  selectSpeaker(speaker) {
    this.props.selectSpeaker(speaker)
  } 
  
  render() {
    const speakers = this.props.speakers.map( (speaker, i) => {
      console.log("These are the speakers:", speaker.name)
      console.log("This is the selected speaker in the Speakers component:", speaker)
      return <p key={i}><Link onClick={() => this.selectSpeaker(speaker)} to={`/speakers/${speaker._id}`}>{speaker.name}</Link></p>
    })
    return (
      
      <div className="Speakers">
        <h1>Your Speakers:</h1>
          {speakers}
            <div className="UserProfile">
          {<UserProfile />}
            </div>
      </div>
  )}
}
  
export default Speakers;