import React, { Component } from 'react';
import { FlatButton, TextField } from 'material-ui';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  signin(e) {
    e.preventDefault();
    console.log(this.state);
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
            hintText="Username"
            floatingLabelText="Username"
            value={this.state.username}
            onChange={(e) => this.handleInput(e, 'username')}
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
