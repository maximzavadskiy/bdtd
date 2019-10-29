import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import FindProblem from '/imports/ui/FindProblem';
import Welcome from '/imports/ui/Welcome';
import SubmitProblem from '/imports/ui/SubmitProblem';
import '/imports/config';
import routes from '/imports/ui/constants'

import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import SubmitProblemSuccess from '../imports/ui/SubmitProblemSuccess';

// FlowRouter automatically mounts React, no need for .render & Meteor.startup
FlowRouter.route(routes.welcome, {
  name: 'Welcome',
  action() {
    mount(Welcome)
  },
});

FlowRouter.route(routes.submitProblem, {
  name: 'Submit Problem',
  action() {
    mount(SubmitProblem)
  },
});

FlowRouter.route(routes.findProblem, {
  name: 'Find Problem',
  action() {
    mount(FindProblem)
  },
});

FlowRouter.route(routes.submitProblemSuccess, {
  name: 'Submit Problem Success',
  action() {
    mount(SubmitProblemSuccess)
  },
});