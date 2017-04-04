import React, { Component } from 'react';
import Commander from './Commander/Commander.js';

import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: '',
      body: '',
      commanders: [{ name: 'Mike Hughes', title: 'Lead', email: 'email.com', picture: 'https://avatars3.githubusercontent.com/u/17888273?v=3&s=460', about: 'small content'}, { name: 'Mike Hughes', title: 'Next', email: 'email.com', picture: 'https://avatars3.githubusercontent.com/u/17888273?v=3&s=460', about: 'small content'}, { name: 'Mike Hughes', title: 'Next Next', email: 'email.com', picture: 'https://avatars3.githubusercontent.com/u/17888273?v=3&s=460', about: 'small content'}, { name: 'Mike Hughes', title: 'Next Next', email: 'email.com', picture: 'https://avatars3.githubusercontent.com/u/17888273?v=3&s=460', about: 'small content'}]
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
          banner: data.banner,
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
            <div className="about" dangerouslySetInnerHTML={{__html: this.state.body}} />
          </div>
          <div className="commanders">
          <h2>Meet the Commanders</h2>
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
