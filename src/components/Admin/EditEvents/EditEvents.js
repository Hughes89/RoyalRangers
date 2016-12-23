import React, { Component } from 'react';
import EditEvent from '../EditEvent/EditEvent';
import myEvents from '../../Events/eventtest';
import './EditEvents.css';


class EditEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: myEvents
    };
  }

  //Change title to _Id once connected to db
  removeEvent = (title) => {
    console.log(title)
    this.setState({
      events: this.state.events.filter(ele => ele.title !== title)
    });
  }

  render() {
    return (
      <div className="Edit-Events">
        {this.state.events.map((event, i) => {
          return (
            <EditEvent key={i} event={event} remove={this.removeEvent} />
          )})}
      </div>
    );
  }
}

export default EditEvents;
