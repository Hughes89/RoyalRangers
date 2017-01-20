import React from 'react';
import { Card, CardText, RaisedButton, Dialog } from 'material-ui';
import EditAlbumDialog from './EditAlbumDialog';

import './EditAlbum.css';

class EditAlbum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  removeAlbum = () => {
    const accept = confirm('Are you sure you want to delete this event?');
    if (accept) {
      const id = this.props.album._id;
      const apiRoute = this.props.api;
      const url = apiRoute + '/api/pictures';
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
        .then(data => this.props.removeAlbumFromState(id));
    }
  }

  handleDialog = (e) => {
    this.setState({
      open: !this.state.open
    });
  }


  render() {
    const { album, i, updateAlbumState, api } = this.props;
    const action = [
      <RaisedButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleDialog} 
      />
    ];
    return (
      <div className="Edit-Album" id={i}>
        <div className="Album-Container">
          <Card>
            <CardText style={{letterSpacing: '1px'}}>
              <strong>Title: </strong>{album.title}<br />
              <div className="album" dangerouslySetInnerHTML={{__html: album.code}} />
              <div className="center-button">
                <RaisedButton label="Edit" style={{paddingRight: '5px'}} primary={true} onClick={this.handleDialog} />
                <RaisedButton label="Remove" primary={true} onClick={this.removeAlbum} />
              </div>
            </CardText>
          </Card>
        </div>
        <Dialog
          title={album.title}
          actions={action}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleDialog}
          autoScrollBodyContent={true}
        >
          <EditAlbumDialog 
            album={album} 
            updateEventState={updateAlbumState} 
            handleDialog={this.handleDialog} 
            api={api}
          />
        </Dialog>
      </div>
    );
  }
}

export default EditAlbum;