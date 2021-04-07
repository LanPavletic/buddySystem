import { buddies } from './buddies';

Meteor.methods({
    'buddies.upsert'(name, manager, isAway, id) {

        //updating buddy when id is given.
        if (id) {
            const update = { $set: { name: name, manager: manager, isAway } };
            buddies.update(id, update);
            console.log(`updating buddies collection (name: ${name}, manager: ${manager}).`);
        } else {
            buddies.insert({
                name: name,
                manager: manager,
                pair: "",
                unavailablePairs: [],
                isAway: false
            });
            console.log(`inserting into buddies collection (name: ${name}, manager: ${manager}).`);
        }
    },

    'buddies.remove'(id) {
        buddies.remove({
            _id: id
        });
        console.log(`removing from buddies collection (id: ${id}).`);
    },

    'buddies.pair'() {
        //TODO
    }
})