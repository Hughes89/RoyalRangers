import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App/App.js';
import Home from './components/Home/Home';
import Pictures from './components/Pictures/Pictures';
import Events from './components/Events/Events';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import EditHome from './components/Admin/EditHome/EditHome';
import EditEvents from './components/Admin/EditEvents/EditEvents';
import EditPictures from './components/Admin/EditPictures/EditPictures';
import EditUsers from './components/Admin/EditUsers/EditUsers';
import UpPassword from './components/UpPassword/UpPassword';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import customTheme from './muiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import './index.css';

injectTapEventPlugin();
const muiTheme = getMuiTheme(customTheme);

const router = (
  <MuiThemeProvider muiTheme={muiTheme} >
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      <IndexRoute component={Home} />
      <Route path="/events" component={Events} onEnter={authenticateUser} />
      <Route path="/login" component={Login} />
      <Route path='/pictures' component={Pictures} onEnter={authenticateUser} />
      <Route path='/update/home' component={EditHome} onEnter={authenticateAdmin} />
      <Route path='/update/pictures' component={EditPictures} onEnter={authenticateAdmin} />
      <Route path='/update/events' component={EditEvents} onEnter={authenticateAdmin} />
      <Route path='/update/users' component={EditUsers} onEnter={authenticateAdmin} />
      <Route path='/update/pass' component={UpPassword} />
      <Route path='*' component={NotFound} />
    </Route>
  </Router>
  </MuiThemeProvider>
)


render(router, document.getElementById('root'));

function authenticateAdmin() {
  const url = '/api/privelage';
  if (localStorage.getItem('RR')) {
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('RR')
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.privelage !== 'admin') {
          browserHistory.push('/');
        }
      });
  } else {
    browserHistory.push('/');
  }
}

function authenticateUser() {
  const url = '/api/privelage';
  if (localStorage.getItem('RR')) {
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('RR')
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.privelage !== 'admin' && data.privelage !== 'user') {
          browserHistory.push('/');
        }
      });
  } else {
    browserHistory.push('/');
  }
}