import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';


Meteor.methods({
    'password.update'(oldPassword, newPassword) {
        Accounts.changePassword(oldPassword, newPassword, ((err) => console.log(err)));
    }
})