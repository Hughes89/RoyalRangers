import React from 'react';


class Event extends React.Component {
  render() {
    const { event } = this.props;
    return (
      <div className="Event">
      <p>{event.description}</p>
      </div>
    );
  }
}

export default Event;