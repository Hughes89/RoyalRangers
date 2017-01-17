import React, { Component } from 'react';
import { FlatButton, TextField } from 'material-ui';

import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: ''
    };
  }

  signin(e) {
    e.preventDefault();
    const apiRoute = this.props.route.api;
    let url = apiRoute + '/api/signin';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => {
        if (res.status === 401) {
          this.incorrectPassword();
        } else if (res.status === 404) {
          this.unknownEmail();
        } else {
          return res.json();
        }})
      .then(data => {
        if (data) {
          localStorage.setItem('RR', data.token);
          window.location.href = "/";
        }
      });
  }

  incorrectPassword() {
    this.setState({
      passwordError: 'Incorrect Password',
      emailError: ''
    })
  }

  unknownEmail() {
    this.setState({
      emailError: 'Incorrect E-mail',
      passwordError: ''
    })
  }

  handleInput(e, state) {
    let value = e.target.value;
    this.setState({
      [state]: value
    });
  }

  render() {
    return (
      <div className="Login">
        <form>
            <TextField
              hintText="E-mail"
              floatingLabelText="E-mail"
              value={this.state.email}
              onChange={(e) => this.handleInput(e, 'email')}
              errorText={this.state.emailError}
              /><br />
            <TextField
              hintText="Password"
              floatingLabelText="Password"
              type="password"
              value={this.state.password}
              onChange={(e) => this.handleInput(e, 'password')}
              errorText={this.state.passwordError}
            /><br />
            <FlatButton type="submit" label="Sign in" onClick={(e) => this.signin(e)} />
          </form>
        </div>
    );
  }
}

export default Login;
