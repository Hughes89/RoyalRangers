import React, { Component } from 'react';
import { Dialog, FlatButton } from 'material-ui';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Event from '../Event/Event';

import myEvents from './eventtest';
import BigCalendarCSS from 'react-big-calendar/lib/css/react-big-calendar.css';
import './Events.css';

BigCalendar.momentLocalizer(moment);

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      event: ''
    };
  }

  handleClose() {
    this.setState({open: false});
  }

  handleToggle(event) {
    this.setState({
      open: !this.state.open,
      event: event
    });
  }

  render() {
    const action = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={() => this.handleClose()}
      />
    ];

    return (
      <div className="Events">
        <BigCalendar
          selectable
          defaultView='month'
          timeslots={2}
          events={myEvents}
          onSelectEvent={event => this.handleToggle(event)}
          defaultDate={new Date()}
        />
        <Dialog
          title={this.state.event.title}
          actions={action}
          modal={false}
          open={this.state.open}
          onRequestClose={() => this.handleClose()}
          autoScrollBodyContent={true}
          >
          <Event event={this.state.event} />
        </Dialog>
      </div>
    );
  }
}

export default Events;
