import React, { Fragment, useState } from 'react';
import Modal from 'react-modal';
import Select from 'react-select';


export const EditModal = ({isOpen, setOpen, BuddyStatus, managers}) => {

    const [buddy, setBuddy] = useState(false);
    const [manager, setManager] = useState(false);
    const [isAway, setIsAway] = useState(false);

    // inserts names in input fields, checks if modal is rendered (can be improved).
    if (isOpen && !buddy && !manager) {
        setBuddy(BuddyStatus.name);
        setManager(BuddyStatus.manager);
        setIsAway(BuddyStatus.isAway);
    }

    const closeModal = () => {
        setOpen(false);
        setBuddy(false);
        setManager(false);
    }

    const handleAccept = () => {
        Meteor.call('buddies.upsert', buddy, manager.value, isAway, BuddyStatus.id);
        closeModal();
    }

    const options = [];
    managers.forEach(manager => {
        options.push({label: manager.name, value: {_id: manager._id, name: manager.name}})
    });
    console.log(manager)
    return(
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            className="modal"
        >
            <label htmlFor="buddyName">Buddy name</label>
            <input id="buddyName" type="text" autoComplete="off" onChange={(e) => setBuddy(e.target.value)} value={buddy}/>
            {manager !== true &&
            <Fragment>
                <Select value={manager} onChange={(option) => setManager(option)}
                options={options} placeholder="select a manager"/>
            </Fragment>
            }
            <div>
                <label htmlFor="awayCheckBox">Employee away: </label>
                <input id="awayCheckBox" type="checkbox" checked={isAway} onChange={() => setIsAway(!isAway)} style={{verticalAlign: 'middle'}}/>
            </div>
            <input type="button" value="accept" onClick={handleAccept}/>
        </Modal>
    );
}