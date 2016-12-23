import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { AppBar, Drawer, MenuItem, Tabs, Tab, FlatButton } from 'material-ui';

import './Navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      admin: true,
    };
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  gotoLink(location) {
    this.setState({open: false});
    browserHistory.push(location);
  }

  isAdmin() {
    return this.state.admin ? (<FlatButton label="Admin Dashboard" />) : (<span></span>);
  }

  activeTab(loc) {
    const { location } = this.props;
    const locations = {
      '/': 0,
      '/events': 1,
      '/about': 2
    }
    return locations[location.pathname];
  }

  render() {
    const tab = this.activeTab();
    return (
      <div>
        <Drawer 
          docked={false}
          open={this.state.open}
          onRequestChange={this.handleToggle.bind(this)}
          >
          <MenuItem onTouchTap={() => this.gotoLink('/update/home')}>Update Home</MenuItem>
          <MenuItem onTouchTap={() => this.gotoLink('/update/events')}>Update Events</MenuItem>
          <MenuItem onTouchTap={() => this.gotoLink('/update/about')}>Update About</MenuItem>
        </Drawer>
        <AppBar
          title="Royal Rangers"
          iconElementRight={this.isAdmin()}
          onRightIconButtonTouchTap={() => this.handleToggle()}
          showMenuIconButton={false}
          />
          <Tabs initialSelectedIndex={tab}>
            <Tab onClick={() => this.gotoLink('/')} label="Home"></Tab>
            <Tab onClick={() => this.gotoLink('/events')} label="Events"></Tab>
            <Tab onClick={() => this.gotoLink('/about')} label="About Us"></Tab>
          </Tabs>
      </div>
    )}
}

export default Navbar;