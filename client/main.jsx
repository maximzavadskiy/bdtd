import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '/imports/ui/App';
import '/imports/config';

import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

// FlowRouter automatically mounts React, no need for .render & Meteor.startup
FlowRouter.route('/', {
  name: 'Welcome',
  action() {
    mount(App)
  },
});


