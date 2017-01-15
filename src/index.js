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
import EditAbout from './components/Admin/EditAbout/EditAbout';
import EditUsers from './components/Admin/EditUsers/EditUsers';
import UpPassword from './components/UpPassword/UpPassword';
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
      <Route path="/events" component={Events} onEnter={authenticateUser} />
      <Route path="/login" component={Login} />
      <Route path='/update/home' component={EditHome} onEnter={authenticateAdmin} />
      <Route path='/update/events' component={EditEvents} onEnter={authenticateAdmin} />
      <Route path='/update/about' component={EditAbout} onEnter={authenticateAdmin} />
      <Route path='/update/users' component={EditUsers} onEnter={authenticateAdmin} />
      <Route path='/update/pass' component={UpPassword} />
      <Route path='*' component={NotFound} />
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