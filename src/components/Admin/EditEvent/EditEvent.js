import React from 'react';
import { Card, CardText, RaisedButton, Dialog } from 'material-ui';
import Moment from 'react-moment';
import EditEventDialog from './EditEventDialog';
import './EditEvent.css';

class EditEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  removeEvent(id) {
    const accept = confirm('Are you sure you want to delete this event?');
    if (accept) {
      const apiRoute = this.props.route.api;
      let url = apiRoute + '/api/remove/event';
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

  handleDialog = (e) => {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    const { event, i, updateEventState } = this.props;
    event.start = new Date(event.start);
    event.end = new Date(event.end);
    const action = [
      <RaisedButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleDialog} />
    ];
    return (
      <div className="Edit-Event" id={i}>
        <div className="Event-Container">
          <Card>
            <CardText>
              <strong><p>{event.title}</p></strong>
              <p>{event.description}</p>
              <p><strong>Start Date & Time:</strong> <Moment format="MMMM Do YYYY, h:mm a." date={event.start} /></p>
              <p><strong>End Date & Time</strong>: <Moment format="MMMM Do YYYY, h:mm a." date={event.end} /></p>
              <RaisedButton label="Edit" onClick={this.handleDialog} />{' '}
              <RaisedButton label="Remove" onClick={() => this.removeEvent(event._id)} />
            </CardText>
          </Card>
        </div>
        <Dialog
          title={event.title}
          actions={action}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleDialog}
          autoScrollBodyContent={true}
          >
          <EditEventDialog event={event} updateEventState={updateEventState} handleDialog={this.handleDialog} />
        </Dialog>
      </div>
    );
  }
}

export default EditEvent;