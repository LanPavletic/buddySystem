import { Meteor } from 'meteor/meteor';
import { buddies } from './buddies';

Meteor.publish('buddies', publishBuddies = () => {
    return buddies.find({})
})