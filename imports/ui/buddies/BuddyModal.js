import React, { useState } from 'react';
import Modal from 'react-modal';
import { buddies } from '../../api/buddies/buddies';

export const BuddyModal = ({isOpen, setOpen}) => {

    const [buddy, setBuddy] = useState("");
    const [manager, setManager] = useState("");

    const closeModal = () => {
        setOpen(false); setBuddy(""); setManager("");
    }

    const insertBuddy = () => {
        Meteor.call('buddies.upsert', buddy, manager, false);
        closeModal();
    }

    return(
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            className="modal"
        >
            <label htmlFor="buddyName">Buddy name</label>
            <input id="buddyName" type="text" autoComplete="off" onChange={(e) => setBuddy(e.target.value)} value={buddy} />
            <label htmlFor="managerName">Manager name</label>
            <input id="managerName" type="text" autoComplete="off" onChange={(e) => setManager(e.target.value)} value={manager} />
            <input type="button" value="accept" onClick={insertBuddy}/>
        </Modal>
    );
}