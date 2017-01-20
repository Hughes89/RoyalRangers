import React, { Component } from 'react';
import { RaisedButton, TextField } from 'material-ui';

import './EditAlbum.css';

class EditAlbumDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.album.title,
      titleError: '',
      code: this.props.album.code,
      codeError: ''
    };
  }

  editAlbum = (e) => {
    e.preventDefault();
    // const error = this.errorCheck();
    // if (!error) {
      let albumFormData = {
        title: this.state.title,
        code: this.state.code,
        id: this.props.album._id
      };
      const apiRoute = this.props.api;
      const url = apiRoute + '/api/pictures';
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('RR')
        },
        body: JSON.stringify(albumFormData)
      })
        .then(res => res)
        .then(data => {
          this.props.updateAlbumState(albumFormData);
          this.props.handleDialog();
        });
    //}
  }

  errorCheck() {
  }

  handleInput = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    this.setState({
      [name]: value
    });
  };

  
  render() {
    return (
      <div className="Add-Event">
        <form className="Add-Event-Form">
          <TextField
            hintText="Album Title"
            floatingLabelText="Album Title"
            value={this.state.title}
            errorText={this.state.titleError}
            errorStyle={{float: "left"}}
            name="title"
            autoComplete="off"
            onChange={this.handleInput}
            fullWidth={true} 
          />
          <br />
          <TextField
            hintText="Flickr Share Code"
            floatingLabelText="Flickr Share Code"
            multiLine={true}
            value={this.state.code}
            errorStyle={{float: "left"}}
            name="code"
            autoComplete="off"
            onChange={this.handleInput}
            fullWidth={true}
          />
          <div className="center">
          <RaisedButton 
            type="submit" 
            label="Update Album" 
            primary={true}
            onClick={this.editAlbum} 
          />
          </div>
        </form>
      </div>
    );
  }
}

export default EditAlbumDialog;
