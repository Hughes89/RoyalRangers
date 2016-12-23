import React, { Component } from 'react';

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

  render() {
    return (
      <div className="Edit-About">
      <textarea value={this.state.body}></textarea>
      </div>
    );
  }
}

export default EditAbout;
