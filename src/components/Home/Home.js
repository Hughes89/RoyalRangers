import React, { Component } from 'react';
import xml2json from '../../xml2json';
import News from './News/News';

import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: '',
      body: '',
      news: []
    };
  }

  componentWillMount() {
    this.getHomeData();
    this.getNews();
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

  getNews() {
    var news = xml2json.fromFile('http://rss.ag.org/feeds/3454.xml');
    this.state.news = news.rss.channel.item;
  }

  gotNews() {
    if (this.state.news.length > 0) {
      return this.state.news.map((news, i) => <News key={i} newsItem={news} />);
    }
  }

  render() {
    console.log(this.state.news);
    return (
      <div className="Home">
        <div className="banner">
          <img src={this.state.banner} />
        </div>
        <div className="body" dangerouslySetInnerHTML={{__html: this.state.body}} />
        <div className="News-Container">
          <h3>News</h3>
          {this.gotNews()}
        </div>
      </div>
    );
  }
}

export default Home;
