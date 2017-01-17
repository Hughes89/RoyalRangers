import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

import './App.css';

class App extends Component {
  render() {
    const { location } = this.props;
    return (
      <div>
      <div className="content">
        <Navbar location={location} api={this.props.route.api} />
          {this.props.children}
      </div>
      <Footer />
      </div>
    );
  }
}

export default App;
