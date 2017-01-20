import React, { Component } from 'react';
import EditUser  from '../EditUser/EditUser';
import AddUser from '../AddUser/AddUser';
import PendingUser from '../PendingUser/PendingUser';
import { Tab, Tabs } from 'material-ui';

import './EditUsers.css';

class editUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: [],
      pending: [],
      slideIndex: 1,
    };
  }

  componentWillMount() {
    this.getUsersData();
  }

  getUsersData() {
    const apiRoute = this.props.route.api;
    const url = apiRoute + '/api/users';
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('RR')
      }
    })
      .then(res => res.json())
      .then(data => {
        data.forEach(user => {
          user.pending ? this.setState({ pending: this.state.pending.concat(user) }) : this.setState({ body: this.state.body.concat(user) });
        });
      });
  }

  addUserToState = (user, activate) => {
    if (activate) {
      this.removeUserFromPending(user);
    }
    this.setState({
      body: this.state.body.concat(user),
    });
  }

  removeUserFromState = (id) => {
    this.setState({
      body: this.state.body.filter(ele => ele._id !== id)
    });
  };

  removeUserFromPending = (user) => {
    this.setState({
      pending: this.state.pending.filter(ele => ele._id !== user._id),
    });
  };

  manageUsers = (value) => {
    this.setState({
      slideIndex: value
    });
  };

  render() {
    const tabStyles = {
      backgroundColor: '#FFEB3B',
      color: '#616161'
    };
    return (
      <div className="Edit-Users">
        <Tabs 
          onChange={this.manageUsers}
          value={this.state.slideIndex} >
          <Tab style={tabStyles} label="Add Users" value={0}>
            <AddUser addUserToState={this.addUserToState} api={this.props.route.api} />
          </Tab>
          <Tab style={tabStyles} label="Manage Users" value={1}>
            <div className="center">
              {this.state.body.map((user, i) => 
                <EditUser 
                  key={i} 
                  user={user} 
                  removeUserFromState={this.removeUserFromState} 
                  api={this.props.route.api} 
                />
              )}
            </div>
          </Tab>
          <Tab style={tabStyles} label={`Pending (${this.state.pending.length})`} value={2}>
            <div className="center">
              {this.state.pending.map((user, i) =>
                <PendingUser 
                  api={this.props.route.api}
                  user={user} 
                  key={i} 
                  addUserToState={this.addUserToState} 
                  removeUserFromPending={this.removeUserFromPending} 
                />
              )}
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default editUsers;