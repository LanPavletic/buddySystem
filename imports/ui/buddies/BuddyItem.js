import React from 'react';
import { buddies } from '../../api/buddies/buddies';

export const BuddyItem = ({buddy, openEditModal}) => {

    const remove = () => {
        Meteor.call('buddies.remove', id);
    }
    const name = buddy.name;
    const manager = buddy.manager;
    const id = buddy._id;
    const isAway = buddy.isAway

    return (
        <div className="buddy-item">
            <input type="button" value="edit" onClick={() => openEditModal(id, name, manager, isAway)}/>
            <input type="image" src="removeIcon.svg" width="30px" height="20px" onClick={remove}/>
            <span>{name}</span>
            <span className="away-span">{isAway ? "Away" : ""}</span>
        </div>
    );
}