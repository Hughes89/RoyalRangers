import React, { Component } from 'react';
import { RaisedButton, TextField, DatePicker, TimePicker, Snackbar } from 'material-ui';

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
      startDateCut: '',
      endDate: null,
      endDateError: null,
      endDateCut: '',
      startTime: null,
      startTimeError: null,
      startTimeCut: '',
      endTime: null,
      endTimeError: null,
      endTimeCut: '',
      open: false
    };
  }

  handleStartDate = (e, date) => {
    const cutDate = date.toString().slice(0, 15);
    this.setState({
      startDate: date,
      startDateCut: cutDate
    });
  };

  handleStartTime = (e, date) => {
    const cutDate = date.toString().slice(16);
    this.setState({
      startTimeCut: cutDate,
      startTime: date
    });
  };

  handleEndDate = (e, date) => {
    const cutDate = date.toString().slice(0, 15);
    this.setState({
      endDate: date,
      endDateCut: cutDate
    });
  };

  handleEndTime = (e, date) => {
    const cutDate = date.toString().slice(16);
    this.setState({
      endTime: date,
      endTimeCut: cutDate
    });
  };

  handleInput = (e) => {
    let value = e.target.value;
    let name = e.target.name
    this.setState({
      [name]: value
    });
  };

  addEvent = (e) => {
    e.preventDefault();
    const error = this.errorCheck();
    if (!error) {
      let eventFormData = {
        title: this.state.title,
        description: this.state.description,
        location: this.state.location,
        start: `${this.state.startDateCut} ${this.state.startTimeCut}`,
        end: `${this.state.endDateCut} ${this.state.endTimeCut}`
      };
      const url = '/api/add/event';
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('RR')
        },
        body: JSON.stringify(eventFormData)
      })
        .then(res => res.json())
        .then(data => {
          eventFormData._id = data.id;
          this.props.addEventToState(eventFormData);
          this.resetStateWithSnackbar();
        });
    }
  };

  resetStateWithSnackbar = () => {
    this.setState({
      title: '',
      titleError: '',
      description: '',
      location: '',
      startDate: null,
      startDateError: null,
      startDateCut: '',
      endDate: null,
      endDateError: null,
      endDateCut: '',
      startTime: null,
      startTimeError: null,
      startTimeCut: '',
      endTime: null,
      endTimeError: null,
      endTimeCut: '',
      open: true
    });
  };

  errorCheck() {
    let errorObj = {};
    const errorHandling = (obj) => {
      obj.title ? this.setState({titleError: 'Please enter a title.'}) : this.setState({titleError: ''});
      obj.startDate ? this.setState({startDateError: 'Must contain a start date.'}) : this.setState({startDateError: ''});
      obj.startTime ? this.setState({startTimeError: 'Must contain a start time.'}) : this.setState({startTimeError: ''});
      obj.endDate ? this.setState({endDateError: 'Must contain a end date.'}) : this.setState({endDateError: ''});
      obj.endTime ? this.setState({endTimeError: 'Must contain a end time.'}) : this.setState({endTimeError: ''});
    }
    this.state.title.length < 1 ? errorObj.title = true : errorObj.title = false;
    this.state.startDate === null ? errorObj.startDate = true : errorObj.startDate = false;
    this.state.endDate === null ? errorObj.endDate = true : errorObj.endDate = false;
    this.state.startTime === null ? errorObj.startTime = true : errorObj.startTime = false;
    this.state.endTime === null ? errorObj.endTime = true : errorObj.endTime = false;
    errorHandling(errorObj);
    for (let key in errorObj) {
      if (errorObj[key] === true) {
        return true;
      }
    }
  };

  handleSnackbarClose = () => {
    this.setState({
      open: false
    });
  };

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
            name="title"
            onChange={this.handleInput}
            autoComplete="off"
            fullWidth={true} 
          />
          <br />
          <TextField
            hintText="Notes"
            floatingLabelText="Notes"
            multiLine={true}
            errorStyle={{float: "left"}}
            value={this.state.description}
            name="description"
            autoComplete="off"
            onChange={this.handleInput}
            fullWidth={true} 
          />
          <TextField
            hintText="Location"
            floatingLabelText="Location"
            multiLine={true}
            errorStyle={{float: "left"}}
            value={this.state.location}
            name="location"
            autoComplete="off"
            onChange={this.handleInput}
            fullWidth={true} 
          />
          <div className="center">
          <strong>Start Date: </strong> 
          <DatePicker 
            hintText="Start Date" 
            mode="landscape"
            errorText={this.state.startDateError}
            errorStyle={{float: "left"}}
            value={this.state.startDate}
            style={{display: 'inline-block'}}
            onChange={this.handleStartDate} 
          />
          <strong>Start Time: </strong> 
          <TimePicker
            format="ampm"
            hintText="Start Time"
            value={this.state.startTime}
            errorText={this.state.startTimeError}
            errorStyle={{float: "left"}}
            style={{display: 'inline-block'}}
            onChange={this.handleStartTime} 
          />
          <br />
          <strong>End Date: </strong>
          <DatePicker 
            hintText="End Date"
            mode="landscape"
            value={this.state.endDate}
            errorText={this.state.endDateError}
            errorStyle={{float: "left"}}
            style={{display: 'inline-block'}}
            onChange={this.handleEndDate} 
          />
          <strong>End Time: </strong> 
          <TimePicker
            format="ampm"
            hintText="End Time"
            value={this.state.endTime}
            errorText={this.state.endTimeError}
            errorStyle={{float: "left"}}
            style={{display: 'inline-block'}}
            onChange={this.handleEndTime} 
          />
          <br /><br />
          <RaisedButton type="submit" label="Create Event" primary={true} onClick={this.addEvent} />
          </div>
        </form>
        <Snackbar
          open={this.state.open}
          message="Event has been added to the calendar!"
          autoHideDuration={4000}
          onRequestClose={this.handleSnackbarClose}
        />
      </div>
    );
  }
}

export default AddEvent;
