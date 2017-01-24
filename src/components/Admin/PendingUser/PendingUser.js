import React from 'react';
import { Card, CardText, RaisedButton } from 'material-ui';

import './PendingUser.css';

class PendingUser extends React.Component {

  addPendingUser = () => {
    const accept = confirm('Are you sure you add this user?');
    if (accept) {
      const url = '/api/activate/user';
      fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('RR'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: this.props.user._id
        })
      })
        .then(res => res)
        .then(data => {
          this.props.addUserToState(this.props.user, true);
        });
    }
  }

  removeUser = () => {
    const accept = confirm('Are you sure you want to delete this user?');
    if (accept) {
      const url = '/api/remove/user';
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('RR'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: this.props.user._id
        })
      })
        .then(res => res)
        .then(data => {
          this.props.removeUserFromPending(this.props.user);
        });
    }
  }
  
  render() {
    const { user, i } = this.props;
    return (
      <div className="Pending-User" id={i}>
      <div className="User-Container">
      <Card>
        <CardText style={{padding: '20px'}} >
          <p>
            <strong className="user">Name: </strong>{user.firstName + ' ' + user.lastName}
            <br />
            <strong className="user">E-mail:</strong> {user.email} 
            <br />
            <strong className="user">Privelage:</strong> {user.privelage}
          </p>
          <div className="center-button">
            <RaisedButton style={{paddingRight: 5}} label="Activate User" onClick={this.addPendingUser} primary={true}/> 
            <RaisedButton label="Decline User" onClick={this.removeUser} primary={true} />
          </div>
        </CardText>
      </Card>
      </div>
      </div>
    );
  }
}

export default PendingUser;