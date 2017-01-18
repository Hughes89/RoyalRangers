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
      passwordError: '',
      pendError: ''
    };
  }

  signin = (e) => {
    e.preventDefault();
    if (this.state.email.length === 0) {
      this.setState({emailError: 'Please enter an e-mail address.'});
      return;
    }
    const apiRoute = this.props.route.api;
    const url = apiRoute + '/api/signin';
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
        } else if (res.status === 403) {
          this.pendingUser();
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
      emailError: '',
      pendError: '',
    });
  }

  unknownEmail() {
    this.setState({
      emailError: 'Incorrect E-mail',
      passwordError: '',
      pendError: ''
    });
  }

  pendingUser() {
    this.setState({
      pendError: 'This user is still waiting on activation.',
      emailError: '',
      passwordError: ''
    });
  }

  handleInput = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    this.setState({
      [name]: value
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
              name="email"
              autoComplete="off"
              onChange={this.handleInput}
              errorStyle={{float: "left"}}
              errorText={this.state.emailError}
            />
            <br />
            <TextField
              hintText="Password"
              floatingLabelText="Password"
              type="password"
              value={this.state.password}
              name="password"
              autoComplete="off"
              onChange={this.handleInput}
              errorStyle={{float: "left"}}
              errorText={this.state.passwordError}
            />
            <br />
            <FlatButton type="submit" label="Sign in" onClick={this.signin} />
            <div style={{color: 'red'}} >{this.state.pendError}</div>
          </form>
        </div>
    );
  }
}

export default Login;
