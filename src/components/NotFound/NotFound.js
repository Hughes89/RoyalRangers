import React, { Component } from 'react';

import './NotFound.css';

class NotFound extends Component {
  render() {
    return(
      <div className="not-found">
          <h1>404 - Page Not Found</h1>
          <p>I'm sorry, the page you were looking for cannot be found!</p>
      </div>
    )
  }
}

export default NotFound;