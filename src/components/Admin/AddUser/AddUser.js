import React, { Component } from 'react';
import { FlatButton, TextField, SelectField, MenuItem, Snackbar } from 'material-ui';

import './AddUser.css';

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      privelage: 'user',
      emailError: '',
      passwordError: '',
      firstNameError: '',
      lastNameError: '',
      open:false
    };
  }

  addUser(e) {
    e.preventDefault();
    let errors = this.errorCheck();
    if (!errors) {
      let userFormData = {
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        privelage: this.state.privelage,
        pending: false 
      }
      const apiRoute = this.props.api;
      let url = apiRoute + '/api/signup';
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
          this.resetStateWithSnackbar();
        });
    }
  }

  resetStateWithSnackbar = () => {
    this.setState({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      privelage: 'user',
      emailError: '',
      passwordError: '',
      firstNameError: '',
      lastNameError: '',
      open: true
    });
  };

  errorCheck() {
    let errorObj = {};
    !validateEmail(this.state.email) ? errorObj.email = true : errorObj.email = false;
    this.state.password.length < 8 ? errorObj.password = true : errorObj.password = false;
    this.state.firstName.length === 0 ? errorObj.firstName = true : errorObj.firstName = false;
    this.state.lastName.length === 0 ? errorObj.lastName = true : errorObj.lastName = false;
    errorHandling.call(this, errorObj);
    for (let key in errorObj) {
      if (errorObj[key] === true) {
        return true;
      }
    }

    function validateEmail(email) {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    function errorHandling (obj) {
      obj.email ? this.setState({emailError: 'Please enter a valid e-mail.'}) : this.setState({emailError: ''});
      obj.password ? this.setState({passwordError: 'Password must be greater then 8 characters.'}) : this.setState({passwordError: ''});
      obj.firstName ? this.setState({firstNameError: 'Must contain more then 1 character.'}) : this.setState({firstNameError: ''});
      obj.lastName ? this.setState({lastNameError: 'Must contain more then 1 character.'}) : this.setState({lastNameError: ''});
    }
  }

  handleInput(e, state) {
    let value = e.target.value;
    this.setState({
      [state]: value
    });
  }

  handleChange = (event, index, value) => {
    this.setState({
      privelage: value
    });
  };

  handleSnackbarClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    return (
      <div className="AddUser">
      <form className="Create-Form">
          <TextField
            hintText="E-mail"
            floatingLabelText="E-mail"
            errorStyle={{float: "left"}}
            errorText={this.state.emailError}
            value={this.state.email}
            onChange={(e) => this.handleInput(e, 'email')}
            />
          <TextField
            hintText="Password"
            floatingLabelText="Password"
            type="password"
            errorStyle={{float: "left"}}
            errorText={this.state.passwordError}
            value={this.state.password}
            onChange={(e) => this.handleInput(e, 'password')}
          /><br />
          <TextField
            hintText="First Name"
            floatingLabelText="First Name"
            errorStyle={{float: "left"}}
            value={this.state.firstName}
            errorText={this.state.firstNameError}
            onChange={(e) => this.handleInput(e, 'firstName')}
          />
          <TextField
            hintText="Last Name"
            floatingLabelText="Last Name"
            errorStyle={{float: "left"}}
            value={this.state.lastName}
            errorText={this.state.lastNameError}
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
        <Snackbar
          open={this.state.open}
          message="User has been added!"
          autoHideDuration={4000}
          onRequestClose={this.handleSnackbarClose}
        />
      </div>
    );
  }
}

export default AddUser;
