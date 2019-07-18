import React, { Component } from 'react';
import './App.css';

/* Components -------------------------------------------- */
import Signup from './Components/Signup';
import Login from './Components/Login';
import Header from './Components/Header';
import SpeakerForm from './Components/SpeakerForm';
// import SelectedSpeaker from './Components/SelectedSpeaker';

/* Pages -------------------------------------------- */
import Landing from './Pages/Landing';
import Speakers from './Pages/Speakers';
import UserProfile from './Components/UserProfile';
import SpeakerContainer from './Components/SpeakerContainer';
import ShowSpeakerQuotes from './Pages/ShowSpeakerQuotes';

/* Third-party -------------------------------------------- */
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import axios from 'axios';
// import LogRocket from 'logrocket';
// LogRocket.init('svvfzp/project4');

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      user: null,
      errorMessage: '',
      lockedResult: '',
      quotes: [],
      selectedSpeaker: null,
      speakers: []
    }
    this.liftTokenToState = this.liftTokenToState.bind(this)
    this.checkForLocalToken = this.checkForLocalToken.bind(this)
    this.logout = this.logout.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.addQuote = this.addQuote.bind(this)
    this.getSpeakers = this.getSpeakers.bind(this)
    this.addSpeaker = this.addSpeaker.bind(this)
    this.getSelectedSpeaker = this.getSelectedSpeaker.bind(this)
    // this.getQuotes = this.getQuotes.bind(this)
  }
  /* State rerender ----------------------------------*/
  componentDidMount() {
    console.log("component did mount");
    this.checkForLocalToken();
    // this.getSpeakers();
    this.getSelectedSpeaker();
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
      }).then( ()=> {
        // maybe better solution would be to call this on login
        // or on state change for user
        this.getSpeakers();
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
  
  
  /* Axios calls to the back ---------------------------------------*/
  
  getSpeakers() {
    console.log("im getting speakers now for", this.state.user );
    if (this.state.user) {
      axios.get(`/api/user/${this.state.user._id}/speakers`)
      .then(res => {
        console.log(res);
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

  getSelectedSpeaker() {
    console.log("I'm GETTING the selected speaker right now", this.state.speaker)
    if (this.state.user) {
      axios.get(`/api/user/${this.state.user._id}/speakers/${this.state.speaker._id}`)
      .then(res => {
        console.log(res);
        this.setState({
          selectedSpeaker: res.data
        })
      })
    } else {
      this.setState({
        speakers: []
      })
    }
  }

  // getQuotes = () => {
  //   if (this.state.user) {
  //     axios.get (`api/user/${this.state.user._id}/speakers/${this.state.selectedSpeaker._id}/quotes`)
  //     .then(res => {
  //       this.setState({
  //         selectedQuotes: res.data
  //       })
  //     })
  //   } else {
  //     this.setState({
  //       selectedQuotes: []
  //     })
  //   }
  // }
  
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

  loginClick = e => {
    this.setState({
      loginSelected: true
    });
  };

  signUpClick = e => {
    this.setState({
      loginSelected: false
    });
  };

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
    let loginCard
    if (this.state.loginSelected === true) {
      loginCard = (
        <>
          <Landing />
          <div className="landingPage">
            <p> If you have an account: </p>
              <button onClick={this.loginClick}>
                Login
              </button>
                <br />
            <p> If you don't have an account: </p> 
              <button onClick={this.signUpClick}>
                Register
              </button>
          <Login liftToken={this.liftTokenToState} />
          
          </div>
        </>
      )
    } else {
      loginCard = (
        <>
          <Landing />
          <div className="landingPage">
            <p> If you have an account: </p>
              <button onClick={this.loginClick}>
                Login
              </button>
                <br />
            <p> If you don't have an account: </p>
              <button onClick={this.signUpClick}>
                Register
              </button>
          <Signup liftToken={this.liftTokenToState} />
          
          </div>
        </>
      )
    }
    let user = this.state.user
    let contents;
    if (user) {
      contents = (
        <div>
          <Router>

            <Route path='/login' component={UserProfile} />

            <Route exact path='/speakers' 
                render={() =>  <Speakers user={this.state.user} speakers={this.state.speakers} addSpeaker={this.addSpeaker} /> } /> 

            <Route path='/speakers/:id' render={()=>
                <ShowSpeakerQuotes getSelectedSpeaker={this.state.selectedSpeaker} addQuote={this.addQuote} /> } />

            {/* <Speakers user={this.state.user} speaker={this.state.speaker} /> */}
            {/*<Route exact path='/speakers' render={() => <SpeakerContainer speakers={this.state.speakers} /> } />
            <Speakers speaker={this.props.speaker} user={this.state.user} />
            <Route exact path='/speakers/:sid/quotes' render={(props) => <ShowSpeakerQuotes {...props} speaker={this.props.speaker} />} /> */}
            {/* <ShowSpeakerQuotes /> */}
            
            <Route exact path='/Landing' 
                render={() => <Login user={this.state.user}/> } />
            
            {/* <Landing /> */}
          <p>
            <a onClick={this.handleClick}>Test the protected route...</a>
          </p>
          <p>
            {this.state.lockedResult}
          </p>
            {this.state.token && (
              <Route path='/profile' component={UserProfile} />
            )}
            {!this.state.token && 
              <Redirect to='/' exact />}
          </Router>
        </div>
      )
      console.log("Who's the user?", this.state.user._id)
      console.log("Who's the selected speaker?", this.state.selectedSpeaker)
      console.log("Are these THE speakers you're looking for?", this.state.speakers)
      console.log("Are these the quotes you're looking for?", this.props.selectedQuotes)
    } else {
      contents = <div>{loginCard}</div>
    }
    
    return (
      <>
        <div className="App">
          {contents}
        </div>
      </>
    )
  }
}

export default App;