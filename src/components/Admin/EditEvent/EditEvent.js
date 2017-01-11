import React from 'react';
import { Card, CardText, RaisedButton } from 'material-ui';
import Moment from 'react-moment';
import './EditEvent.css';

class EditEvent extends React.Component {

  removeEvent(id) {
    const accept = confirm('Are you sure you want to delete this event?');
    if (accept) {
      let url = 'http://localhost:1337/api/remove/event';
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('RR'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id
        })
      })
        .then(res => res)
        .then(data => {
          this.props.removeEventFromState(id);
        });
    }
  }

  render() {
    const { event, i } = this.props;
    event.start = new Date(event.start).toISOString();
    event.end = new Date(event.end).toISOString();
    return (
      <div className="Edit-Event" id={i}>
      <div className="Event-Container">
      <Card>
        <CardText>
          <strong><p>{event.title}</p></strong>
          <p>{event.description}</p>
          <p><strong>Start Date</strong>: <Moment format="MM/DD/YYYY" date={event.start} /></p>
          <p><strong>Start Time</strong>: <Moment format="HH:mm" date={event.start} /></p>
          <p><strong>End Date</strong>: <Moment format="MM/DD/YYYY" date={event.end} /></p>
          <p><strong>End Time</strong>: <Moment format="HH:mm" date={event.end} /></p>
          <RaisedButton label="Edit" />{' '}
          <RaisedButton label="Remove" onClick={() => this.removeEvent(event._id)} />
        </CardText>
      </Card>
      </div>
      </div>
    );
  }
}

export default EditEvent;