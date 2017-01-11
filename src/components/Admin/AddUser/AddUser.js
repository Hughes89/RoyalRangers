import React, { Component } from 'react';
import { FlatButton, TextField, SelectField, MenuItem } from 'material-ui';

import './AddUser.css';

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      privelage: 'user'
    };
  }

  addUser(e) {
    e.preventDefault();
    let url = 'http://localhost:1337/api/signup';
    let userFormData = {
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      privelage: this.state.privelage 
    }
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('RR')
      },
      body: JSON.stringify(userFormData)
    })
      .then(res => res)
      .then(data => {
        this.props.addUserToState(userFormData);
      });
  }

  handleInput(e, state) {
    let value = e.target.value;
    this.setState({
      [state]: value
    });
  }

  handleChange = (event, index, value) => this.setState({privelage: value});

  render() {
    return (
      <div className="AddUser">
      <form className="Create-Form">
          <TextField
            hintText="E-mail"
            floatingLabelText="E-mail"
            value={this.state.email}
            onChange={(e) => this.handleInput(e, 'email')}
            />
          <TextField
            hintText="Password"
            floatingLabelText="Password"
            type="password"
            value={this.state.password}
            onChange={(e) => this.handleInput(e, 'password')}
          />
          <br />
          <TextField
            hintText="First Name"
            floatingLabelText="First Name"
            value={this.state.firstName}
            onChange={(e) => this.handleInput(e, 'firstName')}
          />
          <TextField
            hintText="Last Name"
            floatingLabelText="Last Name"
            value={this.state.lastName}
            onChange={(e) => this.handleInput(e, 'lastName')}
          /><br />
          <SelectField
            value={this.state.privelage}
            onChange={this.handleChange}
            floatingLabelText="Privelages"
            style={{width: 150}}
          >
            <MenuItem key={1} value="user" primaryText="User" />
            <MenuItem key={2} value="admin" primaryText="Admin" />
          </SelectField>
          <br />
          <FlatButton type="submit" label="Create User" onClick={(e) => this.addUser(e)} />
        </form>
      </div>
    );
  }
}

export default AddUser;
