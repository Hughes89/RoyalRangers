import React from 'react';
import { Card, CardText, RaisedButton } from 'material-ui';
import './EditEvent.css';

class EditEvent extends React.Component {
  render() {
    const { event, i, remove } = this.props;
    return (
      <div className="Edit-Event" id={i}>
      <div className="Event-Container">
      <Card>
        <CardText>
          <strong><p>{event.title}</p></strong>
          <p>{event.description}</p>
          <RaisedButton label="Remove" onClick={(e) => remove(event.title)} />
        </CardText>
      </Card>
      </div>
      </div>
    );
  }
}

export default EditEvent;