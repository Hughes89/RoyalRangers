import React, { Component } from 'react';
import { FlatButton, TextField } from 'material-ui';
import './Login.css';

class Login extends Component {
  render() {
    return (
      <div className="Login">
        <form>
          <TextField
            defaultValue="Username"
            floatingLabelText="Username"
            /><br />
          <TextField
            defaultValue="Password"
            floatingLabelText="Password"
            type="password"
          /><br />
          <FlatButton label="Submit" />
        </form>
      </div>
    );
  }
}

export default Login;
