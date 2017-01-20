import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui';
import AddAlbum from '../AddAlbum/AddAlbum';
import EditAlbum from '../EditAlbum/EditAlbum';

import './EditPictures.css';

class EditPictures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: [],
      slideIndex: 1
    };
  }

  componentWillMount() {
    this.getAlbums();
  }

  getAlbums() {
    const apiRoute = this.props.route.api;
    const url = apiRoute + '/api/pictures';
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('RR')
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          body: this.state.body.concat(data)
        });
      });  
  }

  removeAlbumFromState = (id) => {
    this.setState({
      body: this.state.body.filter(ele => ele._id !== id)
    });
  }

  addAlbumToState = (album) => {
    this.setState({
      body: this.state.body.concat(album)
    });
  };

  updateAlbumState = (updated) => {
    this.state.body.forEach(album => {
      if (album._id === updated.id) {
        album.title = updated.title;
        album.code = updated.code;
      }
    });
  };

  managePictures = (value) => {
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
      <div className="Edit-Pictures">
        <Tabs onChange={this.managePictures} value={this.state.slideIndex}>
          <Tab style={tabStyles} label="Add Album" value={0}>
            <div className="Edit-Album-Add">
              <AddAlbum api={this.props.route.api} addAlbumToState={this.addAlbumToState} />
            </div>
          </Tab>
          <Tab style={tabStyles} label="Manage Albums" value={1}>
            <div>
              {this.state.body.map((album, i) => (
                  <EditAlbum 
                    album={album}
                    key={i}
                    api={this.props.route.api} 
                    updateAlbumState={this.updateAlbumState} 
                    removeAlbumFromState={this.removeAlbumFromState}
                  /> 
                )
              )}
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default EditPictures;
