import React, { Component } from 'react';
import { FlatButton, TextField, DatePicker, TimePicker } from 'material-ui';

import './AddEvent.css';

class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null
    };
  }

  handleStartDate = (e, date) => {
    date = date.toString().slice(0, 15);
    this.setState({
      startDate: date
    });
  }

  handleStartTime = (e, date) => {
    date = date.toString().slice(16);
    this.setState({
      startTime: date
    });
  }

  handleEndDate = (e, date) => {
    date = date.toString().slice(0, 15);
    this.setState({
      endDate: date
    });
  }

  handleEndTime = (e, date) => {
    date = date.toString().slice(16);
    this.setState({
      endTime: date
    });
  }

  handleInput = (e, state) => {
    let value = e.target.value;
    this.setState({
      [state]: value
    });
  }

  addEvent = (e) => {
    e.preventDefault();
    let eventFormData = {
      title: this.state.title,
      description: this.state.description,
      start: `${this.state.startDate} ${this.state.startTime}`,
      end: `${this.state.endDate} ${this.state.endTime}`
    };
    const url = 'http://localhost:1337/api/add/event';
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
        this.props.addEventToState(eventFormData);
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
          <strong>Start Date:</strong> <DatePicker 
            hintText="Start Date" 
            mode="landscape"
            style={{display: 'inline-block'}}
            onChange={this.handleStartDate} />
          <strong>Start Time:</strong> <TimePicker
            format="ampm"
            hintText="Start Time"
            style={{display: 'inline-block'}}
            onChange={this.handleStartTime} />
          <br />
          <strong>End Date:</strong> <DatePicker 
            hintText="End Date"
            mode="landscape"
            style={{display: 'inline-block'}}
            onChange={this.handleEndDate} />
          <strong>End Time:</strong> <TimePicker
            format="ampm"
            hintText="End Time"
            style={{display: 'inline-block'}}
            onChange={this.handleEndTime} />
          <br />
          <FlatButton 
            type="submit" 
            label="Create Event" 
            onClick={this.addEvent} />
          </div>
        </form>
      </div>
    );
  }
}

export default AddEvent;
