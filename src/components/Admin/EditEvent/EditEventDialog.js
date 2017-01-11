import React, { Component } from 'react';
import { FlatButton, TextField } from 'material-ui';

import './EditEvent.css';

class EditEventDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.event._id,
      title: props.event.title,
      description: props.event.description,
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
    let eventFormData = {
      id: this.state.id,
      title: this.state.title,
      description: this.state.description,
    };
    const url = 'http://localhost:1337/api/update/event';
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

  
  render() {
    return (
      <div className="Add-Event">
        <form className="Add-Event-Form">
          <TextField
            hintText="Title"
            floatingLabelText="Title"
            value={this.state.title}
            onChange={(e) => this.handleInput(e, 'title')}
            fullWidth={true} />
          <br />
          <TextField
            hintText="Description"
            floatingLabelText="Description"
            multiLine={true}
            value={this.state.description}
            onChange={(e) => this.handleInput(e, 'description')}
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
