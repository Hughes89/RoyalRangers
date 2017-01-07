import React, { Component } from 'react';
import { FlatButton, TextField } from 'material-ui';

import './UpPassword.css';

class UpPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      newPassword: '',
    };
  }

  changePass(e) {
    e.preventDefault();
    let url = 'http://localhost:1337/api/signin';
    fetch(url, {
      method: 'POST',
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
      .then(res => res.json())
      .then(data => {
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
      <div className="Change-Pass">
      <form>
          <TextField
            hintText="Current Password"
            floatingLabelText="Current Password"
            type="password"
            value={this.state.password}
            onChange={(e) => this.handleInput(e, 'password')}
            /><br />
          <TextField
            hintText="New Password"
            floatingLabelText="New Password"
            type="password"
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
