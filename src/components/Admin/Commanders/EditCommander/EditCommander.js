import React from 'react';
import ViewCommander from './ViewCommander/ViewCommander.js';
import UpdateCommander from './UpdateCommander/UpdateCommander.js';
import { Dialog, RaisedButton } from 'material-ui';

import './EditCommander.css';

class EditCommander extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  removeUser = () => {
    const accept = confirm('Are you sure you want to delete this user?');
    if (accept) {
      const id = this.props.commander._id;
      const url = '/api/remove/commander';
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('RR'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id})
      })
        .then(res => res)
        .then(data => this.props.removeCommanderFromState(id));
    }
  };

  handleDialog = () => {
    this.setState({
      open: !this.state.open
    });
  };

  
  render() {
    const { commander } = this.props;
    const action = [
      <RaisedButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleDialog} 
      />
    ];
    return (
      <div className="Edit-Commander">
        <div className="Commander-Container">
          <ViewCommander 
            removeUser={this.removeUser}
            handleDialog={this.handleDialog}
            {...commander}
            />
        </div>
        <Dialog
          title='Edit Commander'
          actions={action}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleDialog}
          autoScrollBodyContent={true}
        >
          <UpdateCommander
            add={false}
            updateCommanderState={this.props.updateCommanderState}
            closeDialog={this.handleDialog}
            {...commander}
          />
        </Dialog>
      </div>
    );
  }
}

export default EditCommander;