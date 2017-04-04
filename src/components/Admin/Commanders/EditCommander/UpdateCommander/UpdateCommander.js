import React, { Component } from 'react';
import { Card, CardText, RaisedButton, TextField } from 'material-ui';

class EditEventDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      name: props.name,
      title: props.title,
      email: props.email,
      picture: props.picture,
      about: props.about,
      titleError: '',
    };
  }

  handleInput = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    this.setState({
      [name]: value
    });
  };

  editEvent = (e) => {
    // e.preventDefault();
    // const error = this.errorCheck();
    // if (!error) {
    //   let eventFormData = {
    //     id: this.state.id,
    //     title: this.state.title,
    //     description: this.state.description,
    //     location: this.state.location
    //   };
    //   const url = '/api/update/event';
    //   fetch(url, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json',
    //       'Authorization': 'Bearer ' + localStorage.getItem('RR')
    //     },
    //     body: JSON.stringify(eventFormData)
    //   })
    //     .then(res => res)
    //     .then(data => {
    //       this.props.updateEventState(eventFormData);
    //       this.props.handleDialog();
    //     });
    // }
    return;
  }

  errorCheck() {
    if (this.state.title.length < 1) {
      this.setState({titleError: 'Please enter a title.'});
      return true;
    } else {
      this.setState({titleError: ''});
      return false;
    }
  }

  
  render() {
    const { editBody } = this.props;
    return (
      <div className="Add-Event">
      <Card>
        <CardText>
        <form className="Add-Event-Form">
          Name: <TextField
            hintText="Name"
            value={this.state.name}
            errorStyle={{float: "left"}}
            name="name"
            autoComplete="off"
            onChange={this.handleInput}
          /><br />
          Title: <TextField
            hintText="Title"
            value={this.state.title}
            errorText={this.state.titleError}
            errorStyle={{float: "left"}}
            name="title"
            autoComplete="off"
            onChange={this.handleInput}
          />
          <br />
          <div className="center">
          <RaisedButton 
            type="submit" 
            label="Update Event" 
            primary={true}
            onClick={this.editEvent}
            style={{paddingRight: '5px'}}
          />
          <RaisedButton 
            label="Cancel" 
            primary={true}
            onClick={editBody} 
          />
          </div>
        </form>
        </CardText>
        </Card>
      </div>
    );
  }
}

export default EditEventDialog;
