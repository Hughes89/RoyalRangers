import React from 'react';
import { Card, CardText, RaisedButton } from 'material-ui';

import './PendingUser.css';

class PendingUser extends React.Component {

  addPendingUser = () => {
    const accept = confirm('Are you sure you add this user?');
    if (accept) {
      const apiRoute = this.props.api;
      let url = apiRoute + '/api/activate/user';
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
      const apiRoute = this.props.api;
      let url = apiRoute + '/api/remove/user';
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
        <CardText>
          <p>
            <strong>Name: </strong>{user.firstName + ' ' + user.lastName}<br />
            <strong>E-mail:</strong> {user.email} <br />
            <strong>Privelage:</strong> {user.privelage}
          </p>
          <RaisedButton style={{paddingRight: 5}} label="Activate User" onClick={this.addPendingUser}/> 
          <RaisedButton label="Decline User" onClick={this.removeUser} />
        </CardText>
      </Card>
      </div>
      </div>
    );
  }
}

export default PendingUser;