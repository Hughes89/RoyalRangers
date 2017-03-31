import React, { Component } from 'react';

import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <div className="Footer-Center">
          Copyright 2017 Royal Rangers Outpost 5<br/>
          Calvary Assembly of God • 4921 Camden Ave, Pennsauken, NJ 08110<br/>
          Telephone: (856)-665-5808<br/>
          Website Created By: <a href="https://mhughesiii.herokuapp.com/">Michael Hughes</a>
        </div>
      </div>
    );
  }
}

export default Footer;
