import React, { useState } from 'react';
import Modal from 'react-modal';
import Select from 'react-select';

export const BuddyModal = ({isOpen, setOpen, managers}) => {

    const [buddy, setBuddy] = useState("");
    const [manager, setManager] = useState(null);
    const [isManager, setIsManager] = useState(true);
    const [isAway, setIsAway] = useState(false);
    const [errorLable, setErrorLabel] = useState("");



    const closeModal = () => {
        setOpen(false); setBuddy(""); setManager(""); setErrorLabel(""); setIsManager(true);
    }

    const insertBuddy = () => {
        console.log(manager)
        if (!buddy) {
            setErrorLabel("buddy name field cannot be empty.");
            return ;
        }
        Meteor.call('buddies.upsert', buddy, isManager ? true : manager.value, isAway);
        closeModal();
    }
    const handleSetIsManager = () => {
        if (!managers.length) {
            setErrorLabel("please set the managers first!")
            return ;
        }
        setIsManager(!isManager)
    }

    const options = [];
    managers.forEach(manager => {
        options.push({label: manager.name, value: {_id: manager._id, name: manager.name}})
    });

    return(
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            className="modal"
        >
            <label htmlFor="buddyName">Buddy name</label>
            <input id="buddyName" type="text" autoComplete="off" onChange={(e) => setBuddy(e.target.value)} value={buddy} />
            <div>
                <label htmlFor="isManagerCB">Is manager:</label>
                <input id="isManagerCB" name="isManagerCB" type="checkbox" checked={isManager} onChange={handleSetIsManager}/>
            </div>
            <div>
                <label htmlFor="isAwayCB">Is away:</label>
                <input id="isAwayCB" type="checkbox" checked={isAway} onChange={() => setIsAway(!isManager)}/>
            </div>
            {
            (!isManager && managers.length) ?
                <div>
                    <label htmlFor="managerName">Manager name</label>
                    <Select value={manager} onChange={(option) => setManager(option)}
                     options={options} placeholder="select a manager"/>
                </div>
                : <div></div>
            }
            <input type="button" value="accept" onClick={insertBuddy}/>
            <label className="errorLabel" style={{color: "red", fontSize: "14px", textAlign: "center"}}>{errorLable}</label>
        </Modal>
    );
}