import React from 'react';
import { Card, CardText, RaisedButton } from 'material-ui';
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
    return (
      <div className="Edit-Event" id={i}>
      <div className="Event-Container">
      <Card>
        <CardText>
          <strong><p>{event.title}</p></strong>
          <p>{event.description}</p>
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