import React, { Component } from 'react';
import { TextField, RaisedButton } from 'material-ui';

import './EditHome.css';

class EditHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: '',
      body: ''
    };
  }

  componentWillMount() {
    this.getHomeData();
  }

  getHomeData() {
    let url = 'http://localhost:1337/api/home';
    fetch(url, {method: 'GET'})
      .then(res => res.json())
      .then(data => {
        this.setState({
          body: data.content,
          banner: data.banner
        });
      });
  }

  handleInput(e, state) {
    let value = e.target.value;
    this.setState({
      [state]: value
    });
  }

  render() {
    return (
      <div className="Edit-Home">
        <TextField
          hintText="http://bannerurl.com"
          floatingLabelText="Banner URL"
          value={this.state.banner}  
          onChange={(e) => this.handleInput(e, 'banner')}        
        /><br />
        <TextField
          hintText="Homepage Content"
          floatingLabelText="Homepage Content"
          fullWidth={true}
          multiLine={true}
          value={this.state.body}
          onChange={(e) => this.handleInput(e, 'body')}       
        /><br />
        <div className="button-align">
          <RaisedButton label="Update" primary={true} />
        </div>
      </div>
    );
  }
}

export default EditHome;
