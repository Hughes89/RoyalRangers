import React from 'react';
import { Card, CardText, RaisedButton } from 'material-ui';

import './EditUser.css';

class EditUser extends React.Component {

  removeUser(id) {
    const accept = confirm('Are you sure you want to delete this user?');
    if (accept) {
      let url = 'http://localhost:1337/api/remove/user';
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('RR'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id
        })
      })
        .then(res => res)
        .then(data => {
          this.props.removeUserFromState(id);
        });
    }
  }
  
  render() {
    const { user, i } = this.props;
    return (
      <div className="Edit-User" id={i}>
      <div className="User-Container">
      <Card>
        <CardText>
          <p>
            <strong>Name: </strong>{user.firstName + ' ' + user.lastName}<br />
            <strong>E-mail:</strong> {user.email} <br />
            <strong>Privelage:</strong> {user.privelage}
          </p>
          <RaisedButton label="Delete User" onClick={(e) => this.removeUser(user._id)}/>
        </CardText>
      </Card>
      </div>
      </div>
    );
  }
}

export default EditUser;