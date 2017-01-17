import React from 'react';
import Moment from 'react-moment';
import { Divider } from 'material-ui';


class Event extends React.Component {
  description() {
    if (this.props.event.description) {
      return (
        <p><strong>Notes:</strong> {this.props.event.description}</p>
      )
    }
  }

  location() {
    if (this.props.event.location) {
      return (
        <div>
        <p><strong>Location:</strong></p>
        <div dangerouslySetInnerHTML={{__html: this.props.event.location}} />
        </div>
      )
    }
  }

  render() {
    const { event } = this.props;
    return (
      <div className="Event">
      {this.description()}
      {this.location()}
      <p><strong>Start Date & Time:</strong> <Moment format="MMMM Do YYYY, h:mm a." date={event.start} /></p>
      <p><strong>End Date & Time</strong>: <Moment format="MMMM Do YYYY, h:mm a." date={event.end} /></p>
      </div>
    );
  }
}

export default Event;