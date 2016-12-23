import React, { Component } from 'react';

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

  render() {
    return (
      <div className="Edit-Home">
        <textarea value={this.state.body}></textarea>
      </div>
    );
  }
}

export default EditHome;
