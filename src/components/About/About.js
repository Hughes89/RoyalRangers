import React, { Component } from 'react';

import './About.css';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: ''
    };
  }

  render() {
    return (
      <div className="About">
        Test Album:<br />
        <a data-flickr-embed="true"  href="https://www.flickr.com/gp/147589952@N05/9P5f7g" title="Test Album"><img src="https://c1.staticflickr.com/6/5786/31465306724_1295de468c_m.jpg" width="240" height="240" alt="Test" /></a><script async src="https://embedr.flickr.com/assets/client-code.js" charSet="utf-8"></script>
      </div>
    );
  }
}

export default About;
