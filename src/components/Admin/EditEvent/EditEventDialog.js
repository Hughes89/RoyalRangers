import React, { Component } from 'react';
import { FlatButton, TextField } from 'material-ui';

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

  handleInput = (e, state) => {
    let value = e.target.value;
    this.setState({
      [state]: value
    });
  }

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
      const apiRoute = this.props.api;
      const url = apiRoute + '/api/update/event';
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
    let errorObj = {};
    this.state.title.length < 1 ? errorObj.title = true : errorObj.title = false;
    errorHandling.call(this, errorObj);
    for (let key in errorObj) {
      if (errorObj[key] === true) {
        return true;
      }
    }

    function errorHandling (obj) {
      obj.title ? this.setState({titleError: 'Please enter a title.'}) : this.setState({titleError: ''});
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
            onChange={(e) => this.handleInput(e, 'title')}
            fullWidth={true} /><br />
          <TextField
            hintText="Notes"
            floatingLabelText="Notes"
            multiLine={true}
            value={this.state.description}
            errorStyle={{float: "left"}}
            onChange={(e) => this.handleInput(e, 'description')}
            fullWidth={true} /><br />
          <TextField
            hintText="Location"
            floatingLabelText="Location"
            multiLine={true}
            value={this.state.location}
            errorStyle={{float: "left"}}
            onChange={(e) => this.handleInput(e, 'location')}
            fullWidth={true} />
          <div className="center">
          <FlatButton 
            type="submit" 
            label="Update Event" 
            onClick={this.editEvent} />
          </div>
        </form>
      </div>
    );
  }
}

export default EditEventDialog;
