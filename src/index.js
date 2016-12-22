import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App/App.js';
import Home from './components/Home/Home';
import About from './components/About/About';
import Events from './components/Events/Events';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const router = (
  <MuiThemeProvider>
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/about" component={About} />
      <Route path="/events" component={Events} />
    </Route>
  </Router>
  </MuiThemeProvider>
)

render(router, document.getElementById('root'));
