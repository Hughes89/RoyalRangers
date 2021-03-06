import React, { Component } from 'react';
import EditEvent from '../EditEvent/EditEvent';
import AddEvent from '../AddEvent/AddEvent';
import { Tab, Tabs } from 'material-ui';

import './EditEvents.css';

class EditEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: [],
      slideIndex: 1
    };
  }

  componentWillMount() {
    this.getEventsData();
  }

  getEventsData() {
    const url = '/api/events';
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
      body: this.state.body.concat(event)
    });
  };

  updateEventState = (updated) => {
    this.state.body.forEach(event => {
      if (event._id === updated.id) {
        event.title = updated.title;
        event.description = updated.description;
        event.loaction = updated.location;
      }
    });
  };

  manageEvents = (value) => {
    this.setState({
      slideIndex: value
    });
  };

  render() {
    const tabStyles = {
      backgroundColor: '#FFEB3B',
      color: '#616161'
    };
    return (
      <div className="Edit-Events">
        <Tabs 
          initialSelectedIndex={1}
          onChange={this.manageEvents}
          value={this.state.slideIndex} >
          <Tab style={tabStyles} label="Add Event" value={0}>
            <AddEvent addEventToState={this.addEventToState} />
          </Tab>
          <Tab style={tabStyles} label="Manage Events" value={1}>
            {this.state.body.map((event, i) => 
              <EditEvent key={i} event={event} removeEventFromState={this.removeEventFromState} updateEventState={this.updateEventState} />
            )}
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default EditEvents;
