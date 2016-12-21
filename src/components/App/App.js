import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
      <div className="content">
        <Navbar />
          {this.props.children}
      </div>
      <Footer />
      </div>
    );
  }
}

export default App;
