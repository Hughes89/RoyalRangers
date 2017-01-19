import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App/App.js';
import Home from './components/Home/Home';
import About from './components/About/About';
import Events from './components/Events/Events';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import EditHome from './components/Admin/EditHome/EditHome';
import EditEvents from './components/Admin/EditEvents/EditEvents';
//import EditAbout from './components/Admin/EditAbout/EditAbout';
import EditUsers from './components/Admin/EditUsers/EditUsers';
import UpPassword from './components/UpPassword/UpPassword';
import apiRoute from './apiRoute'
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import customTheme from './muiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const api = apiRoute.dev;

const muiTheme = getMuiTheme(customTheme);


const router = (
  <MuiThemeProvider muiTheme={muiTheme} >
  <Router history={browserHistory}>
    <Route path="/" component={App} api={api} >
      <IndexRoute component={Home} api={api} />
      <Route path="/events" component={Events} onEnter={authenticateUser} api={api} />
      <Route path="/login" component={Login} api={api} />
      <Route path='/about' component={About} onEnter={authenticateUser} api={api} />
      <Route path='/update/home' component={EditHome} onEnter={authenticateAdmin} api={api} />
      <Route path='/update/events' component={EditEvents} onEnter={authenticateAdmin} api={api} />
      <Route path='/update/users' component={EditUsers} onEnter={authenticateAdmin} api={api} />
      <Route path='/update/pass' component={UpPassword} api={api} />
      <Route path='*' component={NotFound} api={api} />
    </Route>
  </Router>
  </MuiThemeProvider>
)


render(router, document.getElementById('root'));

function authenticateAdmin() {
  const url = 'https://royalrangers.herokuapp.com/api/privelage';
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
  const url = 'https://royalrangers.herokuapp.com/api/privelage';
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