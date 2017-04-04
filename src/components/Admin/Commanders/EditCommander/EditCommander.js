import React from 'react';
import ViewCommander from './ViewCommander/ViewCommander.js';
import UpdateCommander from './UpdateCommander/UpdateCommander.js';

import './EditCommander.css';

class EditCommander extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      edit: false
    }
  }

  removeUser = () => {
    const accept = confirm('Are you sure you want to delete this user?');
    if (accept) {
      const id = this.props.user._id;
      const url = '/api/remove/user';
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('RR'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id})
      })
        .then(res => res)
        .then(data => this.props.removeUserFromState(id));
    }
  };

  editBody = () => {
    this.setState({
      edit: !this.state.edit
    })
  }

  cardBody(commander) {
    console.log(commander)
    if (!this.state.edit) {
      return (<ViewCommander removeUser={this.removeUser}  editBody={this.editBody} {...commander}/>)
    } else {
      return (
      <UpdateCommander 
        editBody={this.editBody}
        updateCommanderState={this.props.updateCommanderState}
        {...commander}
      />
      )
    }
  }
  
  render() {
    const { commander } = this.props;
    return (
      <div className="Edit-Commander">
      <div className="Commander-Container">
        {this.cardBody(commander)}
      </div>
      </div>
    );
  }
}

export default EditCommander;