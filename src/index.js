import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { componentList } from './components.js';
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
    <Route path="/" component={componentList.App} >
      <IndexRoute component={componentList.Home} />
      <Route path="/events" component={componentList.Events} onEnter={authenticateUser} />
      <Route path="/login" component={componentList.Login} />
      <Route path='/pictures' component={componentList.Pictures} onEnter={authenticateUser} />
      <Route path='/signup' component={componentList.Signup} />
      <Route path='/update/home' component={componentList.EditHome} onEnter={authenticateAdmin} />
      <Route path='/update/pictures' component={componentList.EditPictures} onEnter={authenticateAdmin} />
      <Route path='/update/events' component={componentList.EditEvents} onEnter={authenticateAdmin} />
      <Route path='/update/users' component={componentList.EditUsers} onEnter={authenticateAdmin} />
      <Route path='/update/pass' component={componentList.UpPassword} />
      <Route path='*' component={componentList.NotFound} />
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