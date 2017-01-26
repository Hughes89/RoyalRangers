import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { AppBar, Drawer, MenuItem, Tabs, Tab, FlatButton } from 'material-ui';

import './Navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      user: false,
      admin: false
    };
  }

  componentWillMount() {
    this.isLoggedIn();
  }

  isLoggedIn() {
    const url = '/api/privelage';
    if (localStorage.getItem('RR') !== null) {
      fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('RR')
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.privelage === 'admin') {
            this.setState({ user: true, admin: true });
          } else if (data.privelage === 'user') {
            this.setState({ user: true, admin: false });
          }
        });
    }
  }

  handleButton = (e) => {
    if (this.state.user && this.state.admin) {
      this.setState({open: !this.state.open});
    } else if (this.state.user && !this.state.admin) {
      this.gotoLink('UpPassword')
    } else if (!this.state.user && !this.state.admin) {
      this.gotoLink('Login');
    }
  }

  isAdmin() {
    if (this.state.user && this.state.admin) {
      return (
        <div>
          <FlatButton style={{color: 'white'}} label="Admin Dashboard" onClick={this.handleButton} />
          <FlatButton style={{color: 'white'}} label="Logout" onClick={this.logout} />
        </div> )
    } else if (this.state.user && !this.state.admin) {
      return (
        <div>
          <FlatButton style={{color: 'white'}} label="Update Password" onClick={() => this.gotoLink('/update/pass')} />
          <FlatButton style={{color: 'white'}} label="Logout" onClick={this.logout} />
        </div> )
    } else if (!this.state.user && !this.state.admin) {
      return (
        <div>
          <FlatButton style={{color: 'white'}} label="Sign in to view full site" onClick={this.handleButton.bind(this)} />
          <FlatButton style={{color: 'white'}} label="Sign Up" onClick={() => this.gotoLink('/signup')} />
        </div>
         )
    }
  }

  logout = () => {
    localStorage.removeItem('RR');
    this.setState({
      user: false,
      admin: false
    })
    this.gotoLink('/');
  }

  gotoLink(location, title) {
    this.setState({open: false});
    browserHistory.push(location);
  }

  activeTab() {
    const { location } = this.props;
    const locations = {
      '/': 0,
      '/events': 1,
      '/about': 2
    };
    return locations[location.pathname];
  }

  menuCheck() {
    const styles = {
        backgroundColor: '#3F51B5',
        fontWeight: 400,
    }
    if (this.state.user) {
      return (
        <span>
          <Tabs initialSelectedIndex={this.activeTab()}>
            <Tab style={styles} onClick={() => this.gotoLink('/')} label="Home"></Tab>
            <Tab style={styles} onClick={() => this.gotoLink('/events')} label="Events"></Tab>
            <Tab style={styles} onClick={() => this.gotoLink('/pictures')} label="Pictures"></Tab>
          </Tabs>
        </span>
      )
    } else {
      return (<span></span>)
    }
  }

  render() {
    return (
      <div>
        <Drawer 
          docked={false}
          open={this.state.open}
          onRequestChange={this.handleButton}
          >
          <MenuItem onTouchTap={() => this.gotoLink('/update/home')}>Update Home Page</MenuItem>
          <MenuItem onTouchTap={() => this.gotoLink('/update/events')}>Manage Events</MenuItem>
          <MenuItem onTouchTap={() => this.gotoLink('/update/users')}>Manage Users</MenuItem>
          <MenuItem onTouchTap={() => this.gotoLink('/update/pictures')}>Manage Pictures</MenuItem>
          <MenuItem onTouchTap={() => this.gotoLink('/update/pass')}>Update Password</MenuItem>
        </Drawer>
        <AppBar
          title={<span className="title">Royal Rangers</span>}
          onTitleTouchTap={() => this.gotoLink('/')}
          style={{background: 'linear-gradient(135deg, rgba(199,34,0,1) 0%,rgba(232,108,87,1) 50%,rgba(234,40,3,1) 51%,rgba(255,102,0,1) 75%,rgba(199,34,0,1) 100%)'}}
          iconElementRight={this.isAdmin()}
          showMenuIconButton={false}
          />
          {this.menuCheck()}
      </div>
    )}
}

export default Navbar;