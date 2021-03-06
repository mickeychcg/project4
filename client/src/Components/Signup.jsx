import React, {Component} from 'react';
import axios from 'axios';

class Signup extends Component {
  constructor (props) {
    super(props)
      this.state = {
        name: '',
        email: '',
        password: '',
        message: ''
      }
      this.handleNameChange = this.handleNameChange.bind(this)
      this.handleEmailChange = this.handleEmailChange.bind(this)
      this.handlePasswordChange = this.handlePasswordChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleNameChange(e) {
    this.setState({
      name: e.target.value
    })
  }
  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    })
  }
  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    axios.post('/auth/signup', {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }).then( res => {
      if (res.data.type === 'error') {
        console.log('ERROR:', res.data.message)
      } else {
        localStorage.setItem('mernToken', res.data.token)
        this.props.liftToken(res.data)
      }
    }).catch( err => {
      // This block catches the rate limiter errors
      this.setState({
        message: "Maximum accounts exceeded. Please try again later."
      })
    })
  }

  render (){
    return (
      <div className="Auth">
        <h3>Create a new account:</h3>
        <form className="auth-form-right" onSubmit={this.handleSubmit}>
          <div className="form-control"><input onChange={this.handleNameChange} value={this.state.name} type="text" name="name" placeholder="Your name..." /></div><br/>
          <div className="form-control"><input onChange={this.handleEmailChange} value={this.state.email} type="email" name="email" placeholder="Your email..." /></div><br/>
          <div className="form-control"><input onChange={this.handlePasswordChange} value={this.state.password} type="password" name="password" placeholder="Choose a password..." /></div><br/>
          <div className="form-actions"><input type="submit" className="submit-btn" value="Sign up!" /></div>
        </form>
      </div>
    )
  }
}
export default Signup;