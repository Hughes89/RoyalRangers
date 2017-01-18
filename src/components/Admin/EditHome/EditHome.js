import React, { Component } from 'react';
import { TextField, RaisedButton, Snackbar } from 'material-ui';

import './EditHome.css';

class EditHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: '',
      content: '',
      open: false
    };
  }

  componentWillMount() {
    this.getHomeData();
  }

  getHomeData() {
    const apiRoute = this.props.route.api;
    const url = apiRoute + '/api/home';
    fetch(url, {method: 'GET'})
      .then(res => res.json())
      .then(data => {
        this.setState({
          content: data.content,
          banner: data.banner
        });
      });
  }

  editHomeData = () => {
    const apiRoute = this.props.route.api;
    const url = apiRoute + '/api/home';
    fetch(url, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('RR')
        },
      body: JSON.stringify(this.state)
    })
      .then(res => res)
      .then(data => this.setState({open: true}));
  };

  handleInput = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    this.setState({
      [name]: value
    });
  }

  handleSnackbarClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    return (
      <div className="Edit-Home">
        <TextField
          hintText="http://bannerurl.com"
          floatingLabelText="Banner URL"
          fullWidth={true}
          value={this.state.banner} 
          name="banner"
          autoComplete="off"
          onChange={this.handleInput}        
        />
        <br />
        <TextField
          hintText="Homepage Content"
          floatingLabelText="Homepage Content"
          fullWidth={true}
          multiLine={true}
          value={this.state.content}
          name="content"
          autoComplete="off"
          onChange={this.handleInput}       
        />
        <br />
        <div className="button-align">
          <RaisedButton label="Update" primary={true} onClick={this.editHomeData} />
        </div>
        <Snackbar
          open={this.state.open}
          message="Homepage has been updated!"
          autoHideDuration={4000}
          onRequestClose={this.handleSnackbarClose}
        />
      </div>
    );
  }
}

export default EditHome;
