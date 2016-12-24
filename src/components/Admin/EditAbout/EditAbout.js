import React, { Component } from 'react';
import { TextField, RaisedButton } from 'material-ui';

import './EditAbout.css';

class EditAbout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: ''
    };
  }

  componentWillMount() {
    this.getAboutData();
  }

  getAboutData() {
    let url = 'http://localhost:1337/api/about';
    fetch(url, {method: 'GET'})
      .then(res => res.json())
      .then(data => {
        this.setState({
          body: data.content
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
      <div className="Edit-About">
      <TextField
        value={this.state.body}
          hintText="About us Content"
          floatingLabelText="About us Content"
          fullWidth={true}
          multiLine={true}     
          onChange={(e) => this.handleInput(e, 'body')}   
      /><br />
      <div className="button-align">
        <RaisedButton label="Update" primary={true} />
      </div>
      </div>
    );
  }
}

export default EditAbout;
