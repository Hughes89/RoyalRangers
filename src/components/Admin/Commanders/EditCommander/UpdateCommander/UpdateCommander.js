import React, { Component } from 'react';
import { RaisedButton, TextField } from 'material-ui';

class UpdateCommander extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add: props.add,
      id: props.id || '',
      name: props.name || '',
      nameError: '',
      title: props.title || '',
      titleError: '',
      email: props.email || '',
      emailError: '',
      picture: props.picture || '',
      pictureError: '',
      about: props.about || '',
      aboutError: ''
    };
  }

  handleInput = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    this.setState({
      [name]: value
    });
  };

  editCommander = (e) => {
    e.preventDefault();
    const { name, title, email, picture, about } = this.state;
    const { _id } = this.props;
    const error = this.errorCheck();
    if (!error) {
      let eventFormData = { _id, name, title, email, picture, about };
      const url = '/api/update/commander';
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('RR')
        },
        body: JSON.stringify(eventFormData)
      })
        .then(res => res)
        .then(data => {
          this.props.updateCommanderState(eventFormData);
          this.props.closeDialog();
        });
    }
  }

  addCommander = (e) => {
    e.preventDefault();
    const error = this.errorCheck();
    if (!error) {
      const { name, title, email, picture, about } = this.state;
      let eventFormData = { name, title, email, picture, about };
      const url = '/api/add/commander';
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('RR')
        },
        body: JSON.stringify(eventFormData)
      })
        .then(res => res)
        .then(data => {
          eventFormData._id = data.id;
          this.props.addUserToState(eventFormData);
          this.props.closeDialog();
        });
    }
  };

  errorCheck() {
    let errorObj = {};
    const validateEmail = (email) => {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
    const errorHandling = (obj) => {
      obj.email ? this.setState({emailError: 'Please enter a valid e-mail.'}) : this.setState({emailError: ''});
      obj.name ? this.setState({nameError: 'Must contain more then 1 character.'}) : this.setState({nameError: ''});
      obj.title ? this.setState({titleError: 'Must contain more then 1 character.'}) : this.setState({titleError: ''});
      obj.picture ? this.setState({pictureError: 'Must contain more then 1 character.'}) : this.setState({pictureError: ''});
      obj.about ? this.setState({aboutError: 'Must contain more then 1 character.'}) : this.setState({aboutError: ''});
    }
    !validateEmail(this.state.email) ? errorObj.email = true : errorObj.email = false;
    this.state.name.length === 0 ? errorObj.name = true : errorObj.name = false;
    this.state.title.length === 0 ? errorObj.title = true : errorObj.title = false;
    this.state.picture.length === 0 ? errorObj.picture = true : errorObj.picture = false;
    this.state.about.length === 0 ? errorObj.about = true : errorObj.about = false;
    errorHandling(errorObj);
    for (let key in errorObj) {
      if (errorObj[key]) {
        return true;
      }
    }
    return false;
  }

  handleSubmit() {
    if (this.state.add) {
      return (
        <RaisedButton 
          type="submit" 
          label="Add Commander" 
          primary={true}
          onClick={this.addCommander}
        />)
    } else {
      return (
        <RaisedButton 
          type="submit" 
          label="Update Commander" 
          primary={true}
          onClick={this.editCommander}
        />)      
    }
  }

  
  render() {
    const { editBody } = this.props;
    return (
      <div className="Add-Event">
        <form className="Add-Event-Form">
          <TextField
            hintText="Full Name"
            floatingLabelText="Full Name"
            multiLine={true}
            value={this.state.name}
            errorStyle={{float: "left"}}
            errorText={this.state.nameError}
            name="name"
            autoComplete="off"
            onChange={this.handleInput}
            fullWidth={false} 
          />
          <TextField
            hintText="Title"
            floatingLabelText="Title"
            multiLine={true}
            value={this.state.title}
            errorStyle={{float: "left"}}
            errorText={this.state.titleError}
            name="title"
            autoComplete="off"
            onChange={this.handleInput}
            fullWidth={false} 
          />
          <TextField
            hintText="Email"
            floatingLabelText="Email"
            multiLine={true}
            value={this.state.email}
            errorStyle={{float: "left"}}
            errorText={this.state.emailError}
            name="email"
            autoComplete="off"
            onChange={this.handleInput}
            fullWidth={false} 
          />
          <TextField
            hintText="Picture URL"
            floatingLabelText="Picture URL"
            multiLine={true}
            value={this.state.picture}
            errorStyle={{float: "left"}}
            errorText={this.state.pictureError}
            name="picture"
            autoComplete="off"
            onChange={this.handleInput}
            fullWidth={false} 
          />
          <TextField
            hintText="About"
            floatingLabelText="About"
            multiLine={true}
            value={this.state.about}
            errorStyle={{float: "left"}}
            errorText={this.state.aboutError}
            name="about"
            autoComplete="off"
            onChange={this.handleInput}
            fullWidth={true} 
          />
          <div className="center">
            {this.handleSubmit()}
          </div>
        </form>
      </div>
    );
  }
}

export default UpdateCommander;
