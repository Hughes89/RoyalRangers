import React, { Component } from 'react';
import EditEvent from '../EditEvent/EditEvent';
import AddEvent from '../AddEvent/AddEvent';
import { Tab, Tabs } from 'material-ui';
import SwipeableViews from 'react-swipeable-views';
import './EditEvents.css';


class EditEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manage: true,
      body: [],
      slideIndex: 1
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
      manage: !this.state.manage,
    });
  }

  updateEventState = (updated) => {
    this.state.body.map(event => {
      if (event._id === updated.id) {
        event.title = updated.title;
        event.description = updated.description;
      }
    });
  };


  manageEvents = (value) => {
    this.setState({
      slideIndex: value
    });
  };

  viewClick = () => {
    this.setState({
      manage: !this.state.manage
    });
  };

  render() {
    return (
      <div className="Edit-Events">
        <Tabs 
          initialSelectedIndex={1}
          onChange={this.manageEvents}
          value={this.state.slideIndex} >
          <Tab label="Add Event" value={0} />
          <Tab label="Manage Events" value={1} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChange={this.manageEvents}>
        <div>
          <AddEvent api={this.props.route.api} addEventToState={this.addEventToState} />
        </div>
        <div>
          {this.state.body.map((event, i) => <EditEvent key={i} event={event} removeEventFromState={this.removeEventFromState} updateEventState={this.updateEventState} api={this.props.route.api} />
          )}
        </div>
        </SwipeableViews>
      </div>
    );
  }
}

export default EditEvents;
