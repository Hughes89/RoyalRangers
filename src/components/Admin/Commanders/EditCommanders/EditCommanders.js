import React, { Component } from 'react';
import { Tab, Tabs, RaisedButton, Dialog } from 'material-ui';
import EditCommander from '../EditCommander/EditCommander.js';
import UpdateCommander from '../EditCommander/UpdateCommander/UpdateCommander.js';

import './EditCommanders.css';

class EditCommanders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: [],
      slideIndex: 1,
      open: false
    };
  }

  componentWillMount() {
    this.getCommanderData();
  }

  getCommanderData() {
    const url = '/api/commanders';
    fetch(url, { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        this.setState({
          body: data
        })
      });
  }

  /* State Manipulations */
  addUserToState = (user) => {
    this.setState({
      body: [...this.state.body, user],
    });
  }

  removeCommanderFromState = (id) => {
    this.setState({
      body: this.state.body.filter(ele => ele._id !== id)
    });
  };

  updateCommanderState = (update) => {
    this.setState({
      body: this.state.body.map(commander => {
        if (commander._id === update._id) {
          commander = update;
        }
        return commander;
      })
    });
  };

  /* Tabs/Dialog Functionality */
  handleDialog = () => {
    this.setState({
      open: !this.state.open
    });
  };

  manageTabs = (value) => {
    if (value === 0) {
      this.handleDialog();
    }
  };

  render() {
    const tabStyles = {
      backgroundColor: '#FFEB3B',
      color: '#616161'
    };
    const action = [
      <RaisedButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleDialog} 
      />
    ];
    return (
      <div className="Edit-Commanders">
        <Tabs 
          onChange={this.manageTabs}
          value={this.state.slideIndex} >
          <Tab style={tabStyles} label="Add Commander" value={0}>
            <div></div>
          </Tab>
          <Tab style={tabStyles} label="Manage Commanders" value={1}>
            <div className="manage-commanders">
              {this.state.body.map((commander, i) => 
                <EditCommander 
                  key={i}
                  commander={commander}
                  updateCommanderState={this.updateCommanderState}
                  removeCommanderFromState={this.removeCommanderFromState}
                  />
              )}
            </div>
          </Tab>
        </Tabs>
        <Dialog
          title='Edit Commander'
          actions={action}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleDialog}
          autoScrollBodyContent={true}
          >
          <UpdateCommander
            add={true}
            addUserToState={this.addUserToState}
            closeDialog={this.handleDialog}
            />
        </Dialog>
      </div>
    );
  }
}

export default EditCommanders;