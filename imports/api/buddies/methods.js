import { buddies } from './buddies';

Meteor.methods({
    'buddies.upsert'(name, manager, isAway, id=false) {
        //updating buddy when id is given.
        if (id) {
            const update = { $set: { name: name, manager: manager, isAway: isAway } };
            buddies.update(id, update);
            console.log(`updating buddies collection (name: ${name}, manager: ${manager}).`);
        } else {
            buddies.insert({
                name: name,
                manager: manager, // OBJ {id, name}
                prevPairs: [], // OBJ {id, name}
                isAway: isAway
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
        const allBuddies = buddies.find({}).fetch();
        const unPaired = [];

        //making a list of all employees that need pairing (all in this case).
        for (let buddy of allBuddies) {
            unPaired.push(buddy._id);
            buddies.update(buddy._id, {$set: {pair: ""}});
        }

        for (let buddy of allBuddies) {

            // skip buddy if already paired.
            if (!unPaired.includes(buddy._id)) {
                break;
            }
            //copy of unPaired array
            let candidates = [...unPaired];

            // putting manager into array of unavailablePairs if the employee has one.
            if (!buddy.unavailablePairs.length && buddy.manager) {
                // adding manager.
                buddy.unavailablePairs.push(buddies.findOne({name: buddy.manager})._id);

            }
            if (!buddy.unavailablePairs && !buddy.manager) {
                for (let person of allBuddies) {
                    if (person.manager == buddy.name) {
                        buddy.unavailablePairs.push(person._id);
                    }
                }
            }

            buddy.unavailablePairs.push(buddy._id);
            buddies.update(buddy._id, buddy);


            //removing all unavaiablePairs from candidates.
            for (let unavailablePair of buddy.unavailablePairs) {
                if (candidates.includes(unavailablePair)) {
                    candidates.splice(candidates.indexOf(unavailablePair), 1);
                }
            }

            const pick = candidates[Math.floor(Math.random() * candidates.length)];
            buddy.pair = buddies.findOne({_id: pick}).name;
            unPaired.splice(unPaired.indexOf(pick), 1);
            unPaired.splice(unPaired.indexOf(buddy._id), 1);
            console.log(unPaired);
            buddies.update(buddy._id, buddy);
            buddies.update(pick, {$set: {pair: buddy.name}});
        }
    }
})