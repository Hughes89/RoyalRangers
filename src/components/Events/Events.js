import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import BigCalendarCSS from 'react-big-calendar/lib/css/react-big-calendar.css';
import './Events.css';

BigCalendar.momentLocalizer(moment);

class Events extends Component {
  render() {
    const myEventsList = [{}];
    return (
      <div className="Events">
      <BigCalendar
        selectable
        defaultView='month'
        events={myEventsList}
        defaultDate={new Date()}
      />
      </div>
    );
  }
}

export default Events;
