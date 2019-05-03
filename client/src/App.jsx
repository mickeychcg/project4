import React, { Component } from 'react';
import './App.css';

/* Components -------------------------------------------- */
import Signup from './Components/Signup';
import Login from './Components/Login';
import SpeakerForm from './Components/SpeakerForm';
import Header from './Components/Header';
import QuoteForm from './Components/QuoteForm';
import SelectedSpeaker from './Components/SelectedSpeaker';

/* Pages -------------------------------------------- */
// import Speakers from './Pages/Speakers';
import UserProfile from './Components/UserProfile';
import Landing from './Pages/Landing';
import Quotes from './Pages/Quotes';
import SpeakerContainer from './Components/SpeakerContainer';
import SpeakersNew from './Pages/SpeakersNew';

/* Third-party -------------------------------------------- */
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import axios from 'axios';
import ShowSpeakerQuotes from './Pages/ShowSpeakerQuotes';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      user: null,
      errorMessage: '',
      lockedResult: '',
      speakers: [],
      selectedSpeaker: null,
    }
    this.liftTokenToState = this.liftTokenToState.bind(this)
    this.checkForLocalToken = this.checkForLocalToken.bind(this)
    this.logout = this.logout.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.addSpeaker = this.addSpeaker.bind(this)
    this.addQuote = this.addQuote.bind(this)
    this.getSpeakers = this.getSpeakers.bind(this)
    this.getQuote = this.getQuote.bind(this)
    // this.selectSpeaker = this.selectSpeaker.bind(this)
  }

  /* State rerender ----------------------------------*/
  componentDidMount() {
    this.checkForLocalToken()
    // this.getSpeakers()
    // this.selectSpeaker()
  }
  
  /*AUTH ---------------------------------------------------*/  
  checkForLocalToken() {
    // Look in localStorage for the token
    let token = localStorage.getItem('mernToken')
    if (!token || token === 'undefined') {
      // There is no token
      localStorage.removeItem('mernToken')
      this.setState({
        token: '',
        user: null
      })
    } else {
      // Found a token, send it to be verified
      axios.post('/auth/me/from/token', {token})
      .then( res => {
        if (res.data.type === 'error') {
          localStorage.removeItem('mernToken')
          this.setState({errorMessage: res.data.message})
        } else {
          // Put token in localStorage
          localStorage.setItem('mernToken', res.data.token)
          // Put token in state
          this.setState({
            token: res.data.token,
            user: res.data.user
          })
        }
      })
    }
  }
  
  liftTokenToState({token, user}) {
    this.setState({
      token,
      user
    })
  }
  
  
  logout(){
    // Remove the token from localStorage
    localStorage.removeItem ('mernToken')
    // Remove the user and token from state
    this.setState({
      token: '',
      user: null
    })
  }
  
  
  /* Sets State ---------------------------------------*/
  
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

  getQuote = () => {
    if (this.state.user) {
      axios.get (`api/user/${this.state.user._id}/speakers/${this.state.selectedSpeaker._id}/quotes`)
      .then(res => {
        this.setState({
          selectedQuotes: res.data
        })
      })
    } else {
      this.setState({
        selectedQuotes: []
      })
    }
  }
  
  /* Handler functions ---------------------------------*/

  handleClick(e) {
    e.preventDefault()
    // axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.token}`
    let config = {
      headers: {
        Authorization: `Bearer ${this.state.token}`
      }
    }
    axios.get('/locked/test', config).then( res => {
      // console.log("this is the locked response:" , res);
      this.setState({
        lockedResult: res.data
      })
    })
  }

addSpeaker(e) {
    e.persist()
    e.preventDefault()
    let userId = this.state.user._id
    axios.post(`/api/user/${userId}/speakers`, {
      name: e.target.name.value
    }).then(res => {
      axios.get(`/api/user/${userId}/speakers`).then(res => {
        this.setState({speakers: res.data})
      })
    })
  }
  
  addQuote(e) {
    e.persist()
    e.preventDefault()
    let userId = this.state.user._id
    let speakerId = this.state.selectedSpeaker._id
    axios.post(`/api/user/${userId}/speakers/${speakerId}/quotes`, {
      quote: e.target.quote.value
    }).then(res => {
      axios.get(`/api/speakers/${speakerId}`).then(res => {
        this.setState({selectedSpeaker: res.data})
      })
    })
  }
  /* Render --------------------------------------------------*/
  render() {
    let user = this.state.user
    let contents;
    if (user) {
      contents = (
        <div>
          <Header />
            <Router>
              {/* <Route exact path='/' render={() => <SpeakerContainer speakers={this.state.speakers}  user={user} logout={this.logout} /> } /> */}
              {/* <Route exact path='/speakers' component={Speakers} /> */}
              {/* <Route exact path='/speakers' render={() => <Speakers selectSpeaker={this.state.selectSpeaker} speakers={this.state.speakers} getSpeakers={this.getSpeakers} /> } /> */}
              <Route exact path='/speakers' render={() => <SpeakersNew selectSpeaker={this.state.selectSpeaker} speakers={this.state.speakers} getSpeakers={this.getSpeakers} /> } />
              {/* <Route exact path='/speakers' render={() => ( <Speakers speakers={this.state.speakers} getSpeakers={this.getSpeakers} logout={this.logout} /> )} />
              <Route exact path='/speakers' render={() => <SpeakerContainer speakers={this.state.speakers} /> } /> */}
              <Route exact path='/speakers/:pid' render={(props) => <ShowSpeakerQuotes {...props} speaker={this.state.selectedSpeaker} />} />
              {/* {this.state.token && ( <Redirect from='/landing' to='/' exact /> ) }  */}
              <Route exact path='/userprofile' Component={UserProfile} />
              {/* <Route exact path='/speakers/' render={() => ( <SpeakerForm addSpeaker={this.addSpeaker} /> )} /> } */}
            {/* <Route exact path='/speakers' component={Speakers} /> */}
            {/* <Speakers speakers={this.state.speakers} user={this.state.user} logout={this.logout} /> */}
            {/* <SelectedSpeaker selectedSpeaker={this.state.selectedSpeaker} /> */}
            <SpeakerForm addSpeaker={this.addSpeaker} />
            <QuoteForm addQuote={this.addQuote} />
            {/* <Route path="/speakers/:pid" render={(props) => <Speakers speaker={this.state.speakers} addItem={this.addItem} user={user} logout={this.logout} {...props} />}/> */}
            {/* <Route exact path='/' render={() => <AddSpeaker />}/> */}
            {/* <Speakers speakers={this.state.speakers} getSpeakers={this.getSpeakers} /> */}
              {/* <p><a onClick={this.handleClick}>Test the protected route...</a></p> */}
              {/* <p>{this.state.lockedResult}</p> */}
              {/* {this.state.token && (
                <Route path='/profile' component={UserProfile} />
                )}
              {!this.state.token && <Redirect to='/' exact />} */}

            </Router>
        </div>
      )
      console.log("Who is the selected speaker?", this.state.selectedSpeaker)
      console.log("THIS IS ADDSPEAKER", this.state.addSpeaker);
      console.log("HERE IS USER!", this.state.user);
      console.log("HERE IS SPEAKER!", this.state.speakers);
      console.log("What's the token?", this.state.token)
    } else {
      contents = (
        <div className="App">
          <Header />
          <div className="auth">
            <Login liftToken={this.liftTokenToState} />
            <Signup liftToken={this.liftTokenToState} />
          
          </div>

        </div>
      )
    }
    return (
      <div className="App">
        {/* <header><h1>Welcome to Judge-O-Matic!</h1></header> */}
          {/* <div className="content-box"> */}
        {contents}
          {/* </div> */}
      
      </div>
    )
  }
}

export default App;