import React, { Component } from 'react';
import { Link } from 'react-router';

import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <Link to="/login">Admin Login</Link>
      </div>
    );
  }
}

export default Footer;
