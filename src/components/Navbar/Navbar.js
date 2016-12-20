import React, { Component } from 'react';
import { Link } from 'react-router';

import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <div className="Navbar-logo">
          Logo
        </div>
        <div className="space"></div>
        <div className="Navbar-links">
          <Link className="link" to="/">Home</Link>
          <Link className="link" to="/about">About</Link>
        </div>
      </div>
    );
  }
}

export default Navbar;
