import React from 'react';
import { Card, CardText, RaisedButton } from 'material-ui';
import './EditEvent.css';

class EditEvent extends React.Component {
  render() {
    const { event, i, removeEventFromState } = this.props;
    return (
      <div className="Edit-Event" id={i}>
      <div className="Event-Container">
      <Card>
        <CardText>
          <strong><p>{event.title}</p></strong>
          <p>{event.description}</p>
          <RaisedButton label="Edit" />{' '}
          <RaisedButton label="Remove" onClick={() => removeEventFromState(event.title)} />
        </CardText>
      </Card>
      </div>
      </div>
    );
  }
}

export default EditEvent;