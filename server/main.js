import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { buddies } from '../imports/api/buddies/buddies';
import '../imports/api/buddies/methods';
import '../imports/api/buddies/publications';
import '../imports/api/users/methods';

SEED_USERNAME = 'admin';
SEED_PASSWORD = 'admin';

Meteor.startup(() => {
    if (!Accounts.findUserByUsername(SEED_USERNAME)) {
        Accounts.createUser({
            username: SEED_USERNAME,
            password: SEED_PASSWORD
        });
    }
});
