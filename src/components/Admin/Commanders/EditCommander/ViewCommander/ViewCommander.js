import React from 'react';
import { Card, CardText, RaisedButton } from 'material-ui';

const ViewCommander = ({name, title, email, picture, about, removeUser, editBody}) => (
      <Card>
        <CardText style={{padding: '20px'}} >
          <p className="commander-card">
            <strong className="user">Name: </strong>{name}
            <br />
            <strong className="user">Title: </strong>{title}
            <br />
            <strong className="user">E-mail:</strong> {email}
            <br />
            <strong className="user">Picture:</strong> {picture}
            <br />
            <strong className="user">About:</strong> {about}
          </p>
          <div className="center-button">
            <RaisedButton label="Edit Commander" onClick={editBody} primary={true} style={{paddingRight: '5px'}}/>
            <RaisedButton label="Remove Commander" onClick={removeUser} primary={true} />
          </div>
        </CardText>
      </Card>
)

export default ViewCommander;