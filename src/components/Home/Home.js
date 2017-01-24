import React, { Component } from 'react';

import './Home.css';

class Home extends Component {
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
    const url = '/api/home';
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
      <div className="Home">
        <div className="main-image" style={{backgroundImage: `url(${this.state.banner})`}}></div>
        <div className="body" dangerouslySetInnerHTML={{__html: this.state.body}} />
      </div>
    );
  }
}

export default Home;
