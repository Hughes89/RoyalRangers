import React, { Component } from 'react';
import { RaisedButton, TextField, Snackbar } from 'material-ui';

import './AddAlbum.css';

class AddAlbum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      codeError: '',
      title: '',
      titleError: '',
      open: false
    };
  }

  addAlbum = (e) => {
    e.preventDefault();
    // let errors = this.errorCheck();
    // if (!errors) {
      let albumFormData = {
        title: this.state.title,
        code: this.state.code
      }
      const apiRoute = this.props.api;
      const url = apiRoute + '/api/pictures';
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('RR')
        },
        body: JSON.stringify(albumFormData)
      })
        .then(res => res)
        .then(data => {
          this.props.addAlbumToState(albumFormData);
          this.resetStateWithSnackbar();
        });
    //}
  }

  resetStateWithSnackbar = () => {
    this.setState({
      code: '',
      codeError: '',
      title: '',
      titleError: '',
      open: true
    });
  };

  errorCheck() {
    let errorObj = {};
    const errorHandling = (obj) => {
      obj.email ? this.setState({emailError: 'Please enter a valid e-mail.'}) : this.setState({emailError: ''});
      obj.password ? this.setState({passwordError: 'Password must be greater then 8 characters.'}) : this.setState({passwordError: ''});
      obj.firstName ? this.setState({firstNameError: 'Must contain more then 1 character.'}) : this.setState({firstNameError: ''});
      obj.lastName ? this.setState({lastNameError: 'Must contain more then 1 character.'}) : this.setState({lastNameError: ''});
    };
  }

  handleInput = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    this.setState({
      [name]: value
    });
  };

  handleChange = (event, index, value) => {
    this.setState({
      privelage: value
    });
  };

  handleSnackbarClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    return (
      <div className="AddAlbum">
        <form className="Album-Form">
          <TextField
            hintText="Album Title"
            floatingLabelText="Album title"
            errorStyle={{float: "left"}}
            errorText={this.state.titleError}
            value={this.state.title}
            name="title"
            autoComplete="off"
            onChange={this.handleInput}
          />
          <br />
          <TextField
            style={{textAlign: 'left'}}
            hintText="Flickr Code Snippet"
            floatingLabelText="Flickr Code Snippet"
            errorStyle={{float: "left"}}
            errorText={this.state.codeError}
            value={this.state.code}
            name="code"
            multiLine={true}
            autoComplete="off"
            onChange={this.handleInput}
          />
          <br />
          <br /><br />
          <RaisedButton type="submit" label="Add Album" onClick={this.addAlbum} primary={true} />
        </form>
        <Snackbar
          open={this.state.open}
          message="Album has been added!"
          autoHideDuration={4000}
          onRequestClose={this.handleSnackbarClose}
        />
      </div>
    );
  }
}

export default AddAlbum
