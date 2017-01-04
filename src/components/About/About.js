import React, { Component } from 'react';

import './About.css';

class About extends Component {
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
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('RR')
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          body: data.content
        });
      });
  }

  render() {
    return (
      <div className="About">
      <p>{this.state.body}</p>
      </div>
    );
  }
}

export default About;
