import React, { Component } from 'react';
import { FlatButton, TextField } from 'material-ui';
import { browserHistory } from 'react-router';

import './UpPassword.css';

class UpPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      newPassword: '',
      passwordError: '',
      newPasswordError: ''
    };
  }

  changePass(e) {
    e.preventDefault();
    if (this.state.newPassword.length < 8) {
      this.setState({
        newPasswordError: 'Password must be greater then 8 characters.',
        passwordError: ''
      });
      return;
    }
    let url = 'http://localhost:1337/api/password';
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('RR')
      },
      body: JSON.stringify({
        password: this.state.password,
        newPassword: this.state.newPassword
      })
    })
      .then(res => {
        if (res.status === 401) {
          this.setState({
            passwordError: 'Incorrect password.',
            newPasswordError: ''
          })
        }})
      .then(data => {
        browserHistory.push('/');
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
      <div className="Change-Pass">
      <form>
          <TextField
            hintText="Current Password"
            floatingLabelText="Current Password"
            type="password"
            errorText={this.state.passwordError}
            errorStyle={{float: "left"}}
            value={this.state.password}
            onChange={(e) => this.handleInput(e, 'password')}
            /><br />
          <TextField
            hintText="New Password"
            floatingLabelText="New Password"
            type="password"
            errorStyle={{float: "left"}}
            errorText={this.state.newPasswordError}
            value={this.state.newPassword}
            onChange={(e) => this.handleInput(e, 'newPassword')}
          /><br />
          <FlatButton type="submit" label="Change Password" onClick={(e) => this.changePass(e)} />
        </form>
      </div>
    );
  }
}

export default UpPassword;
