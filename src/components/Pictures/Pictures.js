import React, { Component } from 'react';

import './Pictures.css';

class Pictures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: []
    };
  }

  render() {
    return (
      <div className="Pictures">
        Test Album:<br />
<a data-flickr-embed="true"  href="https://www.flickr.com/gp/147589952@N05/m3XTy0" title="Test"><img src="https://c1.staticflickr.com/1/360/32256412512_ce08e287d5_m.jpg" width="240" height="220" alt="Test" /></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>
      </div>
    );
  }
}

export default Pictures;
