import React, { Component } from 'react';
import EditEvent from '../EditEvent/EditEvent';
import AddEvent from '../AddEvent/AddEvent';
import './EditEvents.css';


class EditEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manage: true,
      body: []
    };
  }

  componentWillMount() {
    this.getEventsData();
  }

  getEventsData() {
    const apiRoute = this.props.route.api;
    let url = apiRoute + '/api/events';
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('RR')
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          body: data
        });
      });
  }

  removeEventFromState = (id) => {
    this.setState({
      body: this.state.body.filter(ele => ele._id !== id)
    });
  }

  addEventToState = (event) => {
    this.setState({
      body: this.state.body.concat(event),
      manage: !this.state.manage
    });
  }

  updateEventState = (updated) => {
    this.state.body.map(event => {
      if (event._id === updated.id) {
        event.title = updated.title;
        event.description = updated.description;
      }
    });
  }


  manageEvents() {
    if (this.state.manage) {
      return this.state.body.map((event, i) => {
        return (
          <EditEvent key={i} event={event} removeEventFromState={this.removeEventFromState} updateEventState={this.updateEventState} />
      )})
    } else {
      return (
        <AddEvent addEventToState={this.addEventToState} />
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
