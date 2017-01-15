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
    let url = 'https://royalrangers.herokuapp.com/api/home';
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
        <div className="body">
          <p>{this.state.body}</p>
        </div>
      </div>
    );
  }
}

export default Home;
