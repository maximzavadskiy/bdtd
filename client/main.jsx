import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import FindProblem from '/imports/ui/FindProblem';
import SubmitProblem from '/imports/ui/SubmitProblem';
import '/imports/config';
import routes from '/imports/ui/constants'

import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import SubmitProblemSuccess from '../imports/ui/SubmitProblemSuccess';
import SubmitHiSuccess from '../imports/ui/SubmitHiSuccess';

import ProblemDetail from '../imports/ui/ProblemDetail';

// FlowRouter automatically mounts React, no need for .render & Meteor.startup
FlowRouter.route(routes.welcome, {
  name: 'Find Problem',
  action() {
    mount(FindProblem)
  },
});

FlowRouter.route(routes.submitProblem, {
  name: 'Submit Problem',
  action() {
    mount(SubmitProblem)
  },
});

FlowRouter.route(routes.submitProblemSuccess, {
  name: 'Submit Problem Success',
  action() {
    mount(SubmitProblemSuccess)
  },
});

FlowRouter.route(routes.problemDetail(':_id'), {
  name: 'Problem Detail',
  action() {
    mount(ProblemDetail)
  },
});

FlowRouter.route(routes.submitHiSuccess, {
  name: 'Submit Hi Success',
  action() {
    mount(SubmitHiSuccess)
  },
});


