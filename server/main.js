import { Meteor } from 'meteor/meteor';
import Problems from '../imports/api/Problems';
import Unsubs from '../imports/api/Unsubs';

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
    const getEmail = (userObj) => _.get(userObj, 'emails[0].address')
    _.forEach(Meteor.users.find().fetch(), (advisor) => {
      if (advisor._id === userId || !_.get(advisor, 'emails[0]')) return
      if (Unsubs.findOne({email: getEmail(advisor)})) {
          console.log(getEmail(advisor), 'is unsubscribed from mailling list, skipping')
          return;
      }
      console.log('Sending msg', `${_.get(advisor, 'profile.name')} <${getEmail(advisor)}`, from, subject, text)
      Email.send({ 
        to: `${_.get(advisor, 'profile.name')} <${getEmail(advisor)}>`, 
        from, 
        subject, 
        html: text +
          `<br> <small> You are receiving this emails because you are subscribed to BeedThereDoneThat mentorship platform updates. If you no longer wish to receive emails from BeenThereDoneThat, <a href="${Meteor.absoluteUrl() + 'unsubscribe/' + encodeURI(getEmail(advisor))}">unsubscribe here </a>`

      });


    });
  },
  sendMail(toUserId, fromUserId, subject, text) {
    // Make sure that all arguments are strings.
    // check([to, from, subject, text], [String]);

    // Let other method calls from the same client start running, without
    // waiting for the email sending to complete.
    this.unblock();
    // Send email notification to all registered
    const getEmail = (userObj) => userObj.emails[0].address
    toUser = Meteor.users.findOne({_id: toUserId})
    fromUser = Meteor.users.findOne({ _id: fromUserId })
    console.log(`Sending email (Advisors Hi) from ${getEmail(fromUser)} to ${getEmail(toUser)}`);
    if (Unsubs.findOne({ email: getEmail(toUser) })) {
      console.log(getEmail(toUser), 'is unsubscribed from mailling list, skipping')
      return;
    }
   
    Email.send({
      to: `${_.get(toUser, 'profile.name', '')} <${getEmail(toUser)}>`,
      from: `Notifications from BeenThereDoneThat <maximzavadskiy@gmail.com>`,
      replyTo: `${_.get(fromUser, 'profile.name', '')} <${getEmail(fromUser)}>`,
      subject,
      html: text + 
        `<br> <small> You are receiving this emails 
        because you are subscribed to BeedThereDoneThat mentorship platform updates. 
        If you no longer wish to receive emails from BeenThereDoneThat, 
        <a href="${Meteor.absoluteUrl() + 'unsubscribe/' + encodeURI(getEmail(toUser))}">unsubscribe here </a> </small>`
    });

    // sgMail.send({
    //   to: `${_.get(toUser, 'profile.name', '')} <${getEmail(toUser)}>`,
    //   from: `${_.get(fromUser, 'profile.name', '')} <${getEmail(fromUser)}>`,
    //   subject,
    //   text
    //   // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    // });

  }
});