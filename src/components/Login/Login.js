import React, { Component } from 'react';
import { FlatButton, TextField } from 'material-ui';

import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  signin(e) {
    e.preventDefault();
    let url = 'http://localhost:1337/api/signin';
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
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('RR', data.token);
        window.location.href = "/";
      });
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
            /><br />
          <TextField
            hintText="Password"
            floatingLabelText="Password"
            type="password"
            value={this.state.password}
            onChange={(e) => this.handleInput(e, 'password')}
          /><br />
          <FlatButton type="submit" label="Sign in" onClick={(e) => this.signin(e)} />
        </form>
      </div>
    );
  }
}

export default Login;
