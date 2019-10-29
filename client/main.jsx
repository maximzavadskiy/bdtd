import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '/imports/ui/App';
import FindProblem from '/imports/ui/FindProblem';
import Welcome from '/imports/ui/Welcome';
import '/imports/config';
import routes from '/imports/ui/constants'

import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

debugger;
// FlowRouter automatically mounts React, no need for .render & Meteor.startup
FlowRouter.route('/', {
  name: 'Welcome',
  action() {
    mount(Welcome)
  },
});

FlowRouter.route(routes.submitProblem, {
  name: 'Welcome',
  action() {
    mount(App)
  },
});

FlowRouter.route(routes.findProblem, {
  name: 'Welcome',
  action() {
    mount(FindProblem)
  },
});
