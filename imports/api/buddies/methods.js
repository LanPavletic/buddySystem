import { buddies } from './buddies';


// return persons id and name if more than one or noone returns false
const getPersonObj = (name) => {
    const buddy = buddies.find({name: name}).fetch();

    if (buddy.length > 1) {
        console.log(`more than one person with name: ${name} was found.`)
        return false;
    }
    if (!buddy.length) {
        console.log(`noone with the name: ${name} was found.`)
        return false
    }
    return {_id: buddy[0]._id, name: buddy[0].name};
}

const getManagerBuddies = (name) => {
    const managerBuddies = buddies.find({manager: getPersonObj(name)}).fetch();
    const arr = new Array()
    managerBuddies.forEach((buddy) => arr.push({_id: buddy._id, name: buddy.name}));
    return arr
}

const getCandidates = (unavaiableCandidates, allCandidates) => {
    return allCandidates.filter((buddy) => !unavaiableCandidates.some((person) => person._id === buddy._id));
}

Meteor.methods({
    'buddies.upsert'(name, manager, isAway, id=false) {
        //updating buddy when id is given.
        if (id) {
            const update = { $set: { name: name, manager: manager, isAway: isAway } };
            buddies.update(id, update);
            console.log(`updating buddies collection (name: ${name}, manager: ${manager.name}).`);
        } else {
            buddies.insert({
                name: name,
                manager: manager, // OBJ {id, name}
                prevPairs: [], // OBJ {id, name, (Date=Date of match)}
                isAway: isAway
            });
            console.log(`inserting into buddies collection (name: ${name}, manager: ${manager.name}).`);
        }
    },

    'buddies.remove'(id) {
        buddies.remove({
            _id: id
        });
        console.log(`removing from buddies collection (id: ${id}).`);
    },

    'buddies.pair'() {
        console.log("called buddies.pair")
        //TODO
        // const update = {$push: {prevPairs: getPersonObj("JP")}}
        // buddies.update("7SCH5pmWjFSfJmbW7", update);

        const allBuddies = buddies.find({isAway: {$ne: true}}).fetch();
        // const awayBuddies = buddies.find({isAway: true}).fetch()

        for (let buddy of allBuddies) {
            let unavaiableCandidates = new Array(buddy.manager !== true ? buddy.manager : 0); // array of people the person cannot match with (manager, previus pairs...).
            buddy.prevPairs.forEach((buddy) => unavaiableCandidates.push(getPersonObj(buddy.name)));
            unavaiableCandidates.push(getPersonObj(buddy.name));
            if (buddy.manager === true) {
                getManagerBuddies(buddy.name).forEach((buddy) => unavaiableCandidates.push(buddy));
            }
            const a = new Array();
            allBuddies.forEach((buddy) => a.push(getPersonObj(buddy.name)))
            buddy.candidates = getCandidates(unavaiableCandidates, a);
        }

        // sorting by the number of candidates
        allBuddies.sort((a, b) => a.candidates.length - b.candidates.length);
        let alreadyPicked = [] // PersonObj of people who have been picked
        for (let buddy of allBuddies) {
            if (alreadyPicked.some((person) => person._id === buddy._id)) {
                continue;
            }
            const candidates = getCandidates(alreadyPicked, buddy.candidates);

            if (allBuddies.length - alreadyPicked.length === 3) {

                //TODO


                console.log("create a trio");

                break;
            }

            if (!candidates.length) {

                // TODO

                console.log("exception will occur.")
                console.log(buddy.name);
                console.log(buddy.candidates);
                console.log(alreadyPicked);
                break;
            }

            const chosen = candidates[Math.floor(Math.random() * candidates.length)];
            buddy.pair = chosen;
            const buddyPair = allBuddies.find((buddy) => buddy.name === chosen.name);
            buddyPair.pair = getPersonObj(buddy.name);


            alreadyPicked.push(buddy)
            alreadyPicked.push(buddyPair)

            buddy.prevPairs.push(getPersonObj(buddyPair.name));
            buddyPair.prevPairs.push(getPersonObj(buddy.name));

        }

        for (let buddy of allBuddies) {
            const update = {$set: {pair: buddy.pair}};
            buddies.update(buddy._id, update);
        }
    }
});