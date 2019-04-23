import React, { Component } from 'react';
import './App.css';
import Signup from './Signup';
import Login from './Login';
import UserProfile from './UserProfile';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import axios from 'axios';
// import PersonsShow from './Components/PersonsShow';
// import Analysis from './Components/Analysis';
import Persons from './Components/Persons';
// import { set } from 'mongoose';

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
    this.addNewPerson = this.addNewPerson.bind(this)
    // this.addQuote = this.addQuote.bind(this)
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
    axios.get(`/api/persons`)
    .then(res => {
      this.setState({
        persons: res.data
      })
    })
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

  handleNewPersonClick(person) {
    this.setState({
      person: person
    })
  }
  addNewPerson(e) {
    e.persist()
    e.preventDefault()
    let user = this.props.user
    let person = this.state.user._id
    axios.post(`/api/user/${person}/persons`, {
      name: e.target.name
    }).then(res => {
      axios.get(`/api/user/${user._id}/persons`).then(res => {
        this.setState({persons: res.data})
      })
    })
  }

  render() {
    let user = this.state.user
    let contents;
    if (user) {
      contents = (
        <Router>
        <Route exact path='/' render= {() => <Redirect to='/persons' /> } />
        <Route exact path='/' render={() => <Persons persons={this.state.persons} user={this.state.user} logout={this.logout} />}/>
        <Route path="/persons/:pid" render={(props) => <Persons person={this.state.persons} addItem={this.addItem} user={user} logout={this.logout} {...props} />}/>
        <UserProfile user={user} logout={this.logout} />
        <Persons user={user} persons={this.state.persons} addItem={this.addItem} user={user} logout={this.logout} />
          {/* <p><a onClick={this.handleClick}>Test the protected route...</a></p> */}
          {/* <p>{this.state.lockedResult}</p> */}
        </Router>
      )
      console.log("HERE IS USER!", this.state.user);
      console.log("HERE IS PERSON!", this.state.persons);
    } else {
      contents = (
      <>
        <Signup liftToken={this.liftTokenToState} />
        <Login liftToken={this.liftTokenToState} />
      </>
      )
    }
    return (
      <div className="App">
        <header><h1>Welcome to Judge-O-Matic!</h1></header>
        <div className="content-box">
        {contents}
        </div>
      </div>
    )
  }
}

export default App;