import React, { Component } from 'react';
import { FlatButton, TextField, DatePicker } from 'material-ui';

import './AddEvent.css';

class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      start: null,
      end: null
    };
  }

  handleStart = (e, date) => {
    this.setState({
      start: date
    });
  }

  handleEnd = (e, date) => {
    this.setState({
      end: date
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
    console.log(this.state);
  }

  

  render() {
    return (
      <div className="AddEvent">
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
          <br />
          <DatePicker 
            hintText="Start Date" 
            mode="landscape"
            fullWidth={true}
            value={this.state.start} 
            onChange={this.handleStart} />
          <DatePicker 
            hintText="End Date"
            mode="landscape"
            fullWidth={true}
            value={this.state.end} 
            onChange={this.handleEnd} />
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
