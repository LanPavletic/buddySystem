import React, { useState } from 'react';
import Modal from 'react-modal';
import { Accounts } from 'meteor/accounts-base';

export const ProfileModal = ({isOpen, setOpen}) => {

    const [status, setStatus] = useState({
        oldPassword: "",
        newPassword: "",
        retypedNewPassword: ""
    });

    handleChange = e => {
        console.log(e.target.name)
        setStatus({...status, [e.target.name]: e.target.value});
        console.log(status);
    }

    handleAccept = () => {
        if (status.newPassword !== status.retypedNewPassword) {
            console.log("passowrds must match");
        } else {
            console.log(status.oldPassword, status.newPassword)
            // any chance to call it on server side?
            // documentation said it has to be called on client side.
            Accounts.changePassword(status.oldPassword, status.newPassword, ((err) => console.log(err)));
        }
    }

    const closeModal = () => {
        setOpen(false);
    }

    return(
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            className="modal"
        >
            <label htmlFor="oldPassword">Enter your currnet password</label>
            <input name="oldPassword" id="oldPassword" type="password" onChange={handleChange} autoComplete="new-password"></input>
            <label htmlFor="newPassword">Enter new password</label>
            <input name="newPassword" id="newPassword" type="password" onChange={handleChange} autoComplete="off"></input>
            <label htmlFor="retypedNewPassword">Retype your password</label>
            <input name="retypedNewPassword" id="retypedNewPassword" type="password" onChange={handleChange} autoComplete="off"></input>
            <input type="button" value="Accept" onClick={handleAccept}/>
        </Modal>
    );
}