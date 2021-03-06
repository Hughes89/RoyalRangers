import React, { Component } from 'react';
import { RaisedButton, TextField } from 'material-ui';

import './EditEvent.css';

class EditEventDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.event._id,
      title: props.event.title,
      titleError: '',
      description: props.event.description,
      location: props.event.location
    };
  }

  handleInput = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    this.setState({
      [name]: value
    });
  };

  editEvent = (e) => {
    e.preventDefault();
    const error = this.errorCheck();
    if (!error) {
      let eventFormData = {
        id: this.state.id,
        title: this.state.title,
        description: this.state.description,
        location: this.state.location
      };
      const url = '/api/update/event';
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
          this.props.updateEventState(eventFormData);
          this.props.handleDialog();
        });
    }
  }

  errorCheck() {
    if (this.state.title.length < 1) {
      this.setState({titleError: 'Please enter a title.'});
      return true;
    } else {
      this.setState({titleError: ''});
      return false;
    }
  }

  
  render() {
    return (
      <div className="Add-Event">
        <form className="Add-Event-Form">
          <TextField
            hintText="Title"
            floatingLabelText="Title"
            value={this.state.title}
            errorText={this.state.titleError}
            errorStyle={{float: "left"}}
            name="title"
            autoComplete="off"
            onChange={this.handleInput}
            fullWidth={true} 
          />
          <br />
          <TextField
            hintText="Notes"
            floatingLabelText="Notes"
            multiLine={true}
            value={this.state.description}
            errorStyle={{float: "left"}}
            name="description"
            autoComplete="off"
            onChange={this.handleInput}
            fullWidth={true} 
          />
          <br />
          <TextField
            hintText="Location"
            floatingLabelText="Location"
            multiLine={true}
            value={this.state.location}
            errorStyle={{float: "left"}}
            name="location"
            autoComplete="off"
            onChange={this.handleInput}
            fullWidth={true} 
          />
          <div className="center">
          <RaisedButton 
            type="submit" 
            label="Update Event" 
            primary={true}
            onClick={this.editEvent} 
          />
          </div>
        </form>
      </div>
    );
  }
}

export default EditEventDialog;
