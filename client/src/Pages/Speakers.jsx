import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SpeakerForm from '../Components/SpeakerForm';

class Speakers extends Component {
  constructor (props) {
    super (props)
    this.state = {
      selectedSpeaker: null,
      selectedQuotes: '',
      speakers: []
    }
  }

  // componentDidMount() {
  //   if (this.props.user) {
  //     axios.get(`/api/user/${this.props.user._id}/speakers/${this.state.speakers}`)
  //     .then(res => {
  //       this.setState({
  //         speakers: res.data
  //       })
  //     })
  //   } else {
  //     this.setState({
  //       speakers: []
  //     })
  //   }
  //   if (this.props.user) {
  //     axios.get (`api/user/${this.props.user._id}/speakers/${this.state.selectedSpeakers}/quotes`)
  //     .then(res => {
  //       this.setState({
  //         selectedSpeakers: res.data
  //       })
  //     })
  //   } else {
  //     this.setState({
  //       selectedSpeakers: []
  //     })
  //   }
  // }
  
  render() {
    const speakers = this.props.speakers.map( (speakers, i) => {
      return <p key={i}><Link onClick={() => this.props.speakers(speakers,i )} to={`/speakers/${speakers._id}/`}>{speakers.name}</Link></p>
    })
    return (
      
      <div className="Speakers">
        <SpeakerForm addSpeaker = {this.props.addSpeaker}></SpeakerForm>
        <h1>Your Speakers:</h1>
          {speakers}
      </div>
  )}
}
  
export default Speakers;