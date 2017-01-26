import React, { Component } from 'react';
import { RaisedButton, TextField } from 'material-ui';
import { browserHistory } from 'react-router';

import './Signup.css';

class Signup extends Component {
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
    };
  }

  addUser = (e) => {
    e.preventDefault();
    let errors = this.errorCheck();
    if (!errors) {
      let userFormData = {
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        privelage: 'user',
        pending: true 
      };
      const url = '/api/signup';
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('RR')
        },
        body: JSON.stringify(userFormData)
      })
        .then(res => res.json())
        .then(data => {
          alert('Your application has been submitted for approval by an administrator.');
          browserHistory.push('/');
        });
    }
  }

  errorCheck() {
    let errorObj = {};
    const validateEmail = (email) => {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
    const errorHandling = (obj) => {
      obj.email ? this.setState({emailError: 'Please enter a valid e-mail.'}) : this.setState({emailError: ''});
      obj.password ? this.setState({passwordError: 'Password must be greater then 8 characters.'}) : this.setState({passwordError: ''});
      obj.firstName ? this.setState({firstNameError: 'Must contain more then 1 character.'}) : this.setState({firstNameError: ''});
      obj.lastName ? this.setState({lastNameError: 'Must contain more then 1 character.'}) : this.setState({lastNameError: ''});
    }
    !validateEmail(this.state.email) ? errorObj.email = true : errorObj.email = false;
    this.state.password.length < 8 ? errorObj.password = true : errorObj.password = false;
    this.state.firstName.length === 0 ? errorObj.firstName = true : errorObj.firstName = false;
    this.state.lastName.length === 0 ? errorObj.lastName = true : errorObj.lastName = false;
    errorHandling(errorObj);
    for (let key in errorObj) {
      if (errorObj[key]) {
        return true;
      }
    }
    return false;
  }

  handleInput = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    this.setState({
      [name]: value
    });
  };

  handleChange = (event, index, value) => {
    this.setState({
      privelage: value
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
            name="email"
            autoComplete="off"
            onChange={this.handleInput}
          />
          <TextField
            hintText="Password"
            floatingLabelText="Password"
            type="password"
            errorStyle={{float: "left"}}
            errorText={this.state.passwordError}
            value={this.state.password}
            name="password"
            autoComplete="off"
            onChange={this.handleInput}
          />
          <br />
          <TextField
            hintText="First Name"
            floatingLabelText="First Name"
            errorStyle={{float: "left"}}
            value={this.state.firstName}
            errorText={this.state.firstNameError}
            autoComplete="off"
            name="firstName"
            onChange={this.handleInput}
          />
          <TextField
            hintText="Last Name"
            floatingLabelText="Last Name"
            errorStyle={{float: "left"}}
            value={this.state.lastName}
            errorText={this.state.lastNameError}
            autoComplete="off"
            name="lastName"
            onChange={this.handleInput}
          />
          <br />
          <br />
          <RaisedButton type="submit" label="Sign up" primary={true} onClick={this.addUser} />
        </form>
      </div>
    );
  }
}

export default Signup;
