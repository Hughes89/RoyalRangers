import React, { Component } from 'react';
import EditEvent from '../EditEvent/EditEvent';
import AddEvent from '../AddEvent/AddEvent';
import myEvents from '../../Events/eventtest';
import './EditEvents.css';


class EditEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manage: true,
      body: myEvents
    };
  }

  //Change title to _Id once connected to db
  removeEventFromState = (title) => {
    console.log(title)
    this.setState({
      body: this.state.body.filter(ele => ele.title !== title)
    });
  }

  manageEvents() {
    if (this.state.manage) {
      return this.state.body.map((event, i) => {
        return (
          <EditEvent key={i} event={event} removeEventFromState={this.removeEventFromState} />
      )})
    } else {
      return (
        <AddEvent addUserToState={this.addUserToState} />
        )
    }
  }

  handleView() {
    if (this.state.manage) {
      return ( <p className="event-manage"><span className="event-link" onClick={this.viewClick}>Add Event </span> || <strong>Manage Events</strong></p>)
    } else {
      return ( <p className="event-manage"><strong>Add Event</strong> || <span className="event-link" onClick={this.viewClick}>Manage Events</span></p>)
    }
  }

  viewClick = () => {
    this.setState({
      manage: !this.state.manage
    })
  }

  render() {
    return (
      <div className="Edit-Events">
        {this.handleView()}
        {this.manageEvents()}
      </div>
    );
  }
}

export default EditEvents;
