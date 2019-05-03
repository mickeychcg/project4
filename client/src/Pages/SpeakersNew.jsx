import React, {Component} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import UserProfile from '../Components/UserProfile';

class SpeakersNew extends Component {
  constructor (props) {
    super (props) 
    this.state = {
      speakers: [],
      selectSpeaker: null 
    }
    this.getSpeakers = this.getSpeakers.bind(this)
  }
  componentDidMount() {
    this.getSpeakers()
  }

  selectSpeaker(speaker) {
    this.selectSpeaker(speaker)
  }

  getSpeakers = () => {
    if (this.state.user) {
      axios.get(`/api/user/${this.state.user._id}/speakers`)
      .then(res => {
        this.setState({
          speakers: res.data
        })
      })
    } else {
      this.setState({
        speakers: []
      })
    }
  }

  render() {
    const speakers = this.state.speakers.map( (speaker, i) => {
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

export default SpeakersNew;