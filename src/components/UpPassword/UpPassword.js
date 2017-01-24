import React, { Component } from 'react';
import { RaisedButton, TextField } from 'material-ui';
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
    if (this.state.password.length < 1) {
      this.setState({
        passwordError: 'Please enter your current password.'
      });
      return;
    }
    if (this.state.newPassword.length < 8) {
      this.setState({
        newPasswordError: 'Password must be greater then 8 characters.',
        passwordError: ''
      });
      return;
    }
    let url = '/api/password';
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
        }
        if (res.status === 200) {
          browserHistory.push('/');
        }
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
            onChange={(e) => this.handleInput(e, 'password')} /><br />
          <TextField
            hintText="New Password"
            floatingLabelText="New Password"
            type="password"
            errorStyle={{float: "left"}}
            errorText={this.state.newPasswordError}
            value={this.state.newPassword}
            onChange={(e) => this.handleInput(e, 'newPassword')} /><br /><br />
          <RaisedButton type="submit" primary={true} label="Change Password" onClick={(e) => this.changePass(e)} />
        </form>
      </div>
    );
  }
}

export default UpPassword;
