import React from 'react';
import { buddies } from '../../api/buddies/buddies';

export const BuddyItem = ({buddy, openEditModal}) => {

    const remove = () => {
        Meteor.call('buddies.remove', id);
    }

    //seting the buddies values into te edit modal.
    const name = buddy.name;
    // if buddy is manager set manager to true otherwise
    // set to object so Select component can display it right.
    const manager = typeof buddy.manager === "object" ? {label: buddy.manager.name, value: buddy.manager} : true;
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