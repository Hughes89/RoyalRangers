import React from 'react';
import Moment from 'react-moment';
import { Divider } from 'material-ui';


class Event extends React.Component {
  render() {
    const { event } = this.props;
    return (
      <div className="Event">
      <p>{event.description}</p>
      <Divider />
      <p><strong>Start Date & Time:</strong> <Moment format="MMMM Do YYYY, h:mm a." date={event.start} /></p>
      <p><strong>End Date & Time</strong>: <Moment format="MMMM Do YYYY, h:mm a." date={event.end} /></p>
      </div>
    );
  }
}

export default Event;