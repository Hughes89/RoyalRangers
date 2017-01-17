import React, { Component } from 'react';
import EditUser  from '../EditUser/EditUser';
import AddUser from '../AddUser/AddUser';

import './EditUsers.css';

class editUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: [],
      manage: true,
    };
  }

  componentWillMount() {
    this.getUsersData();
  }

  getUsersData() {
    const apiRoute = this.props.route.api;
    let url = apiRoute + '/api/users';
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('RR')
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          body: data
        });
      });
  }

  addUserToState = (user) => {
    this.setState({
      body: this.state.body.concat(user),
      manage: !this.state.manage
    });
  }

  removeUserFromState = (id) => {
    this.setState({
      body: this.state.body.filter(ele => ele._id !== id)
    });
  };

  manageUsers() {
    if (this.state.manage) {
      return this.state.body.map((user, i) => {
        return (
          <EditUser key={i} user={user} removeUserFromState={this.removeUserFromState} />
      )})
    } else {
      return (
        <AddUser addUserToState={this.addUserToState} />
        )
    }
  }

  viewClick = () => {
    this.setState({
      manage: !this.state.manage
    })
  }

  handleView() {
    if (this.state.manage) {
      return ( <p className="user-manage"><span className="user-link" onClick={this.viewClick}>Add User </span> || <strong>Manage Users</strong></p>)
    } else {
      return ( <p className="user-manage"><strong>Add User</strong> || <span className="user-link" onClick={this.viewClick}>Manage Users</span></p>)
    }
  }

  render() {
    return (
      <div className="Edit-Users">
        {this.handleView()}
        {this.manageUsers()}
      </div>
    );
  }
}

export default editUsers;
