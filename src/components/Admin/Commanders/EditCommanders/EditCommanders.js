import React, { Component } from 'react';
import { Tab, Tabs } from 'material-ui';
import EditCommander from '../EditCommander/EditCommander.js';

import './EditCommanders.css';

class EditCommanders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: [],
      slideIndex: 1,
    };
  }

  componentWillMount() {
    this.getUsersData();
  }

  getUsersData() {
    // const url = '/api/user';
    // fetch(url, {
    //   method: 'GET',
    //   headers: {
    //     'Authorization': 'Bearer ' + localStorage.getItem('RR')
    //   }
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     data.forEach(user => {
    //       user.pending ? this.setState({ pending: this.state.pending.concat(user) }) : this.setState({ body: this.state.body.concat(user) });
    //     });
    //   });
    this.setState({
      body: [{ id: 1, name: 'Mike Hughes', title: 'Lead', email: 'email.com', picture: 'https://avatars3.githubusercontent.com/u/17888273?v=3&s=460', about: 'small content'}, { id: 2, name: 'Mike Hughes', title: 'Next', email: 'email.com', picture: 'https://avatars3.githubusercontent.com/u/17888273?v=3&s=460', about: 'small content'}, { id: 3, name: 'Mike Hughes', title: 'Next Next', email: 'email.com', picture: 'https://avatars3.githubusercontent.com/u/17888273?v=3&s=460', about: 'small content'}, { id: 4, name: 'Mike Hughes', title: 'Next Next', email: 'email.com', picture: 'https://avatars3.githubusercontent.com/u/17888273?v=3&s=460', about: 'small content'}]
    });
  }

  addUserToState = (user) => {
    this.setState({
      body: this.state.body.concat(user),
    });
  }

  removeUserFromState = (id) => {
    this.setState({
      body: this.state.body.filter(ele => ele._id !== id)
    });
  };

  manageUsers = (value) => {
    this.setState({
      slideIndex: value
    });
  };

  updateCommanderState = (id, update) => {
    this.setState({
      body: this.state.body.map(commander => {
        if (commander.id === id) {
          commander = update;
        }
        return commander;
      })
    });
  };

  render() {
    const tabStyles = {
      backgroundColor: '#FFEB3B',
      color: '#616161'
    };
    return (
      <div className="Edit-Commanders">
        <Tabs 
          onChange={this.manageUsers}
          value={this.state.slideIndex} >
          <Tab style={tabStyles} label="Add Commander" value={0}>
            <div></div>
          </Tab>
          <Tab style={tabStyles} label="Manage Commanders" value={1}>
            <div className="manage-commanders">
              {this.state.body.map((commander, i) => 
                <EditCommander commander={commander} key={i} updateCommanderState={this.updateCommanderState} />
              )}
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default EditCommanders;