import React, { Component } from 'react';
import './App.css';

/* Components -------------------------------------------- */
import Signup from './Components/Signup';
import Login from './Components/Login';
import PersonForm from './Components/PersonForm';
import Header from './Components/Header';
import QuoteForm from './Components/QuoteForm';

/* Pages -------------------------------------------- */
import Persons from './Pages/Persons';
import UserProfile from './Components/UserProfile';
import Landing from './Pages/Landing';
import Quotes from './Pages/Quotes';
import PersonContainer from './Components/PersonContainer';

/* Third-party -------------------------------------------- */
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      user: null,
      errorMessage: '',
      lockedResult: '',
      persons: [],
      personality: [],
      quotes: []
    }
    this.liftTokenToState = this.liftTokenToState.bind(this)
    this.checkForLocalToken = this.checkForLocalToken.bind(this)
    this.logout = this.logout.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.addPerson = this.addPerson.bind(this)
    // this.addQuote = this.addQuote.bind(this)
    this.getPersons = this.getPersons.bind(this)
  }

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
  
  getPersons = () => {
    if (this.state.user) {
      axios.get(`/api/user/${this.state.user._id}/persons`)
      .then(res => {
        this.setState({
          persons: res.data
        })
      })
    } else {
      this.setState({
        persons: []
      })
    }
  }
  
  componentDidMount() {
    this.checkForLocalToken()
    this.getPersons()
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

  addPerson(e) {
    e.persist()
    e.preventDefault()
    let userId = this.state.user._id
    axios.post(`/api/user/${userId}/persons`, {
      name: e.target.name.value
    }).then(res => {
      axios.get(`/api/user/${userId}/persons`).then(res => {
        this.setState({persons: res.data})
      })
    })
  }

  addQuote(e) {
    e.persist()
    e.preventDefault()
    let userId = this.state.user._id
    let personId = this.state.person._id
    axios.post(`/api/user/${userId}/persons/${personId}/quotes`, {
      name: e.target.name.value
    }).then(res => {
      axios.get(`/api/user/${userId}/persons/${personId}/quotes`).then(res => {
        this.setState({quotes: res.data})
      })
    })
  }

  render() {
    let user = this.state.user
    let contents;
    if (user) {
      contents = (
        <div>
          <Header />
            <Switch>

              {/* {this.state.token && 
              <Route exact path='/' render={() => <Landing  user={user} logout={this.logout} /> } /> } */}
              <Route exact path='/persons' render={() => ( <Persons judgees={this.state.persons} getPersons={this.getPersons} logout={this.logout} /> )} />
              {/* <Route exact path='/persons' render={() => <PersonContainer judgees={this.state.persons} /> } /> */}

              {/* {this.state.token && ( <Redirect from='/landing' to='/' exact /> ) }  */}
              {/* <Route exact path='/' component={UserProfile} /> */}
              {/* <Route exact path='/persons/' render={() => ( <PersonForm addPerson={this.addPerson} /> )} /> } */}
            {/* <Route exact path='/persons' component={Persons} /> */}
            {/* <Persons persons={this.state.persons} user={this.state.user} logout={this.logout} /> */}
            {/* <PersonForm addPerson={this.addPerson} /> */}
            {/* <Route path="/persons/:pid" render={(props) => <Persons person={this.state.persons} addItem={this.addItem} user={user} logout={this.logout} {...props} />}/> */}
            {/* <Route exact path='/' render={() => <AddPerson />}/> */}
            {/* <Persons judgees={this.state.persons} getPersons={this.getPersons} /> */}
              {/* <p><a onClick={this.handleClick}>Test the protected route...</a></p> */}
              {/* <p>{this.state.lockedResult}</p> */}
              {/* {this.state.token && (
                <Route path='/profile' component={UserProfile} />
                )}
              {!this.state.token && <Redirect to='/' exact />} */}

            </Switch>
        </div>
      )
      // console.log("THIS IS ADDPERSON", this.state.addPerson);
      // console.log("HERE IS USER!", this.state.user);
      // console.log("HERE IS PERSON!", this.state.persons);
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