import React, { Component } from 'react';
import Picture from './Picture/Picture.js';

import './Pictures.css';

class Pictures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: []
    };
  }

  componentWillMount() {
    this.getAlbums();
  }

  getAlbums() {
    const url = '/api/pictures';
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('RR')
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          body: this.state.body.concat(data)
        });
      });  
  }

  render() {
    return (
      <div className="Pictures">
        {this.state.body.map((album, i) => {
          return <Picture album={album} key={i} />
        })}
      </div>
    );
  }
}

export default Pictures;
