import React, { Component } from 'react';
import Links from '../api/links';
import _ from 'lodash';
import Button from '@material-ui/core/Button';


export default class Hello extends Component {
  state = {
    counter: 0,
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1
    });
    Links.insert({url: "focusedtalk.tech", title: "Get our cool app"})
  }

  render() {
    return (
      <div>
        
        <Button variant="contained" color="primary" onClick={() => this.increment()}>Click Me</Button>
        <p>You've pressed the button {this.state.counter} times.</p>
      </div>
    );
  }
}
