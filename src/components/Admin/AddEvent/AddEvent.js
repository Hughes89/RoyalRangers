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
    const start = `${this.state.startDate} ${this.state.startTime}`;
    const end =  `${this.state.endDate} ${this.state.endTime}`;
    console.log(this.state, start, end);
  }

  

  render() {
    return (
      <div className="Add-Event">
        <form className="Add-Event-Form">
        Basic Event Information:<br />
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
          <p>Event Dates & Times:</p>
          <DatePicker 
            hintText="Start Date" 
            mode="landscape"
            fullWidth={true}
            onChange={this.handleStartDate} />
          <TimePicker
            format="ampm"
            hintText="Start Time"
            fullWidth={true}
            onChange={this.handleStartTime} />
          <DatePicker 
            hintText="End Date"
            mode="landscape"
            fullWidth={true}
            onChange={this.handleEndDate} />
          <TimePicker
            format="ampm"
            hintText="End Time"
            fullWidth={true}
            onChange={this.handleEndTime} />
          <div className="center">
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
