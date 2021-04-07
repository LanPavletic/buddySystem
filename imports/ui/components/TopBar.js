import React from 'react';
import { Meteor } from 'meteor/meteor';

export const TopBar = ({ handleOpenProfileModal }) => {
    return (
        <div className="top-bar">
                <label htmlFor="profileBuddy">{Meteor.user().username}</label>
                <input id="profileBuddy" type="image" src="profileIcon.svg" width="60px" height="35" onClick={handleOpenProfileModal}/>
        </div>
    );
};