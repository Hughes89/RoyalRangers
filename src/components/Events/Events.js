import React, { Component } from 'react';
import { Dialog, FlatButton } from 'material-ui';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Event from './Event/Event';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Events.css';

BigCalendar.momentLocalizer(moment);

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      event: '',
      body: []
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
        data.forEach((ele) => {
          ele.start = new Date(ele.start);
          ele.end = new Date(ele.end);
        });
        this.setState({
          body: this.state.body.concat(data)
        });
      });
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleToggle = (event) => {
    this.setState({
      open: !this.state.open,
      event: event
    });
  };

  render() {
    const action = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];
    return (
      <div className="Events">
        <BigCalendar
          selectable
          defaultView='month'
          timeslots={2}
          events={this.state.body}
          onSelectEvent={this.handleToggle}
          defaultDate={new Date()}
        />
        <Dialog
          title={this.state.event.title}
          actions={action}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <Event event={this.state.event} />
        </Dialog>
      </div>
    );
  }
}

export default Events;
