import React from 'react';
import { Card, CardText, RaisedButton } from 'material-ui';

import './EditUser.css';

class EditUser extends React.Component {

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
  
  render() {
    const { user, i } = this.props;
    return (
      <div className="Edit-User" id={i}>
      <div className="User-Container">
      <Card>
        <CardText style={{padding: '20px'}} >
          <p className="user-card">
            <strong className="user">Name: </strong>{user.firstName + ' ' + user.lastName}
            <br />
            <strong className="user">E-mail:</strong> {user.email}
            <br />
            <strong className="user">Privelage:</strong> {user.privelage}
          </p>
          <div className="center-button">
            <RaisedButton label="Delete User" onClick={this.removeUser} primary={true} />
          </div>
        </CardText>
      </Card>
      </div>
      </div>
    );
  }
}

export default EditUser;