import { Meteor } from 'meteor/meteor';
import Problems from '../imports/api/Problems';
import _ from 'lodash';

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
