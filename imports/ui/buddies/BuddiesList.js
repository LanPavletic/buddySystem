import React from 'react';
import { BuddyItem } from './BuddyItem';
import { useTracker } from 'meteor/react-meteor-data';
import { buddies } from '../../api/buddies/buddies';



export const BuddiesList = ({ openEditModal, filter }) => {

    const { allBuddies } = useTracker(() => {
        const handler = Meteor.subscribe('buddies');

        //regular expresion for searching names.
        let re = new RegExp(`${filter}[A-z]*`);

        return {
            allBuddies: buddies.find(filter ? {name: re} : {}).fetch()
        };
    })

    return (
        <div>
            <h2 className="list-label">List of buddies</h2>
            <div className="list-wrapper">
                <ul>
                    {allBuddies.map((buddy) => <BuddyItem key={buddy._id} buddy={buddy} openEditModal={openEditModal}/>)}
                </ul>
            </div>
        </div>

    );
}