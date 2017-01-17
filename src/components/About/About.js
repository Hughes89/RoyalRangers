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

        <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d12254.412715650958!2d-75.02052495740972!3d39.83831382852809!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1484669707604" width="600" height="450" frameBorder="0" style={{border:0 }}allowFullScreen></iframe>
      </div>
    );
  }
}

export default About;
