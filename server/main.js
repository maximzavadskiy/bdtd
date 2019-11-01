import { Meteor } from 'meteor/meteor';
import Problems from '../imports/api/Problems';
import _ from 'lodash';
import { Email } from 'meteor/email'

Meteor.users.allow({
  update() { return true; }
});

Meteor.startup(() => {
  // console.log
  // _.map(Problems.find().fetch(), (problem) => Problems.remove(problem._id))
  console.log('Problems in DB: ', Problems.find().fetch())
  // if(Problems.find().count() === 0) {
  //   Problems.insert({
  //     title: "Delivery & priorities when you have to do everything",
  //     createdAt: new Date(),
  //     description: "As the only person in marketing team i am lost between tasks and failing at delivery. I am  team manager at the company that does startup events & media. Main goal is to sell tickets for our event",
  //     user: "Test user" // TODO assign sum user
  //   })

  //   Problems.insert({
  //     title: "Balancing prototype with user interivews",
  //     createdAt: new Date(),
  //     description: "I am product lead in the company. We are super early stage & many things are uncertain. However team is eager to start. How can we utilize both developers and designers without wasting too much effort? My fear is that if we start building code now, most of it will be thrown out and team will be discouraged.",
  //     user: "Test user" // TODO assign sum user
  //   })
  // }
});

// Server: Define a method that the client can call.
Meteor.methods({
  sendRequestToAdvisors(userId, from, subject, text) {
    // Make sure that all arguments are strings.
    // check([to, from, subject, text], [String]);

    // Let other method calls from the same client start running, without
    // waiting for the email sending to complete.
    this.unblock();
    // Send email notification to all registered
    const getEmail = (userObj) => userObj.emails[0].address
    _.forEach(Meteor.users.find().fetch(), (advisor) => {
      if (advisor._id === userId || !_.get(advisor, 'emails[0]')) return

      Email.send({ 
        to: `${advisor.profile.name} <${getEmail(advisor)}>`, 
        from, 
        subject, 
        text 
      });


    });
  }
});