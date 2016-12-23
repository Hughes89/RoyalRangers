import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App/App.js';
import Home from './components/Home/Home';
import About from './components/About/About';
import Events from './components/Events/Events';
import Login from './components/Login/Login';
import EditHome from './components/Admin/EditHome/EditHome';
import EditEvents from './components/Admin/EditEvents/EditEvents';
import EditAbout from './components/Admin/EditAbout/EditAbout';
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
      <Route path="/login" component={Login} />
      <Route path='/update/home' component={EditHome} />
      <Route path='/update/events' component={EditEvents} />
      <Route path='/update/about' component={EditAbout} />
    </Route>
  </Router>
  </MuiThemeProvider>
)

render(router, document.getElementById('root'));
