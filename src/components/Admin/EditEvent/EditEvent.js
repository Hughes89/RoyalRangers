import React from 'react';

class EditEvent extends React.Component {
  render() {
    const { event, i, remove } = this.props;
    return (
      <div className="Edit-Event" id={i}>
        <p><strong>{event.title}</strong></p>
        <p>{event.description}</p>
        <button onClick={(e) => remove(event.title)}>Remove</button>
      </div>
    );
  }
}

export default EditEvent;