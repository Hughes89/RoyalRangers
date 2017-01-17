import React, { Component } from 'react';
import { FlatButton, TextField, DatePicker, TimePicker } from 'material-ui';

import './AddEvent.css';

class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      titleError: '',
      description: '',
      location: '',
      startDate: null,
      startDateError: null,
      endDate: null,
      endDateError: null,
      startTime: null,
      startTimeError: null,
      endTime: null,
      endTimeError: null
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
    const error = this.errorCheck();
    if (!error) {
      let eventFormData = {
        title: this.state.title,
        description: this.state.description,
        location: this.state.location,
        start: `${this.state.startDate} ${this.state.startTime}`,
        end: `${this.state.endDate} ${this.state.endTime}`
      };
      const apiRoute = this.props.route.api;
      let url = apiRoute + 'api/add/event';
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
  }

  errorCheck() {
    let errorObj = {};
    this.state.title.length < 1 ? errorObj.title = true : errorObj.title = false;
    this.state.startDate === null ? errorObj.startDate = true : errorObj.startDate = false;
    this.state.endDate === null ? errorObj.endDate = true : errorObj.endDate = false;
    this.state.startTime === null ? errorObj.startTime = true : errorObj.startTime = false;
    this.state.endTime === null ? errorObj.endTime = true : errorObj.endTime = false;
    errorHandling.call(this, errorObj);
    for (let key in errorObj) {
      if (errorObj[key] === true) {
        return true;
      }
    }

    function errorHandling (obj) {
      obj.title ? this.setState({titleError: 'Please enter a title.'}) : this.setState({titleError: ''});
      obj.startDate ? this.setState({startDateError: 'Must contain a start date.'}) : this.setState({startDateError: ''});
      obj.startTime ? this.setState({startTimeError: 'Must contain a start time.'}) : this.setState({startTimeError: ''});
      obj.endDate ? this.setState({endDateError: 'Must contain a end date.'}) : this.setState({endDateError: ''});
      obj.endTime ? this.setState({endTimeError: 'Must contain a end time.'}) : this.setState({endTimeError: ''});
    }
  }

  

  render() {
    return (
      <div className="Add-Event">
        <form className="Add-Event-Form">
          <TextField
            hintText="Title"
            floatingLabelText="Title"
            errorText={this.state.titleError}
            errorStyle={{float: "left"}}
            value={this.state.title}
            onChange={(e) => this.handleInput(e, 'title')}
            fullWidth={true} />
          <br />
          <TextField
            hintText="Notes"
            floatingLabelText="Notes"
            multiLine={true}
            errorStyle={{float: "left"}}
            value={this.state.description}
            onChange={(e) => this.handleInput(e, 'description')}
            fullWidth={true} />
            <TextField
            hintText="Location"
            floatingLabelText="Location"
            multiLine={true}
            errorStyle={{float: "left"}}
            value={this.state.location}
            onChange={(e) => this.handleInput(e, 'location')}
            fullWidth={true} />
          <div className="center">
          <strong>Start Date:</strong> <DatePicker 
            hintText="Start Date" 
            mode="landscape"
            errorText={this.state.startDateError}
            errorStyle={{float: "left"}}
            style={{display: 'inline-block'}}
            onChange={this.handleStartDate} />
          <strong>Start Time:</strong> <TimePicker
            format="ampm"
            hintText="Start Time"
            errorText={this.state.startTimeError}
            errorStyle={{float: "left"}}
            style={{display: 'inline-block'}}
            onChange={this.handleStartTime} />
          <br />
          <strong>End Date:</strong> <DatePicker 
            hintText="End Date"
            mode="landscape"
            errorText={this.state.endDateError}
            errorStyle={{float: "left"}}
            style={{display: 'inline-block'}}
            onChange={this.handleEndDate} />
          <strong>End Time:</strong> <TimePicker
            format="ampm"
            hintText="End Time"
            errorText={this.state.endTimeError}
            errorStyle={{float: "left"}}
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
