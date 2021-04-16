import React from 'react';
import { BuddiesPair } from './BuddeisPair';

export const BuddiesPairList = (allBuddies) => {
    const pairs = new Array();
    const getPairs = () => {
        const toSkip = new Array();
        for (let buddy of allBuddies.allBuddies) {
            if (toSkip.includes(buddy.name)) {
                continue;
            }
            pairs.push({first: buddy.name, second: buddy.pair.name});
            toSkip.push(buddy.pair.name);
        }
        return pairs;
    }
    if (allBuddies.allBuddies.length > 0){
        getPairs();
        console.log(pairs);
    }

    return (
        <div>
            <h2 className="list-label" onClick={() => Meteor.call('buddies.pair')}>Make pairs</h2>
            <div className="list-wrapper">
                <ul>
                    {pairs.map((pair) => <BuddiesPair first={pair.first} second={pair.second}  />)}
                </ul>
            </div>
        </div>
    );
}