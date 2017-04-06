import React, { Component } from 'react';
import Commander from './Commander/Commander.js';

import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: '',
      body: '',
      commanders: []
    };
  }

  componentWillMount() {
    this.getHomeData();
    this.getCommanders();
  }

  getHomeData() {
    const url = '/api/home';
    fetch(url, {method: 'GET'})
      .then(res => res.json())
      .then(data => {
        this.setState({
          body: data.content,
          banner: data.banner,
        });
      });
  }

  getCommanders() {
    const url = '/api/commanders';
    fetch(url, { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        this.setState({
          commanders: data
        });
      });
  }

  render() {
    return (
      <div className="home">
        <div className="banner" style={{backgroundImage: `url(${this.state.banner})`}} />
        <div className="home-content">
          <div className="about-content">
            <h2>About Us</h2>
            <span className="title-fade-line" />
            <div className="about" dangerouslySetInnerHTML={{__html: this.state.body}} />
          </div>
          <div className="commanders">
          <h2>Meet the Commanders</h2>
          <span className="title-fade-line" />
            {this.state.commanders.map((commander, i) => 
              <Commander key={i} {...commander} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
