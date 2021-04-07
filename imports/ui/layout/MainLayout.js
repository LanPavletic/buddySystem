import React, { Fragment, useState } from 'react';
import { TopBar } from '../components/TopBar';
import { BuddyItem } from '../buddies/BuddyItem';
import { BuddiesList } from '../buddies/BuddiesList';
import { BuddiesPairList } from '../buddies/BuddiesPairList';
import Modal from 'react-modal';
import styled from 'styled-components';
import { BuddyModal } from '../buddies/BuddyModal';
import { ProfileModal } from '../profile/ProfileModal';
import { buddies } from '../../api/buddies/buddies';
import { EditModal } from '../buddies/EditModal';


Modal.setAppElement('#react-target');

    const LeftLayout = styled.div`
        display: block;
        justify-content: center;
        margin: 0 150px;

    `
    const RightLayout = styled.div`
        display: block;
        justify-content: center;
        margin: 0 150px;
    `
    const Grid = styled.div`
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 50px 50px;
        grid-gap: 5px;
    `

export const MainLayout = () => {

    const [profileModalIsOpen, setProfileModalIsOpen] = useState(false);
    const [buddyModalIsOpen, setBuddyModalIsOpen] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);

    const [buddySearch, SetbuddySearch] = useState("");

    const [editModalStatus, setEditModalStatus] = useState({
        id: "",
        name: "",
        manager: "",
        isAway: false
    })

    const openProfileModal = () => {
        setProfileModalIsOpen(true);
    }

    const openCreateModal = () => {
        setBuddyModalIsOpen(true);
    }

    const openEditModal = (id, name, manager, isAway) => {
        setEditModalIsOpen(true);
        setEditModalStatus({id: id, name: name, manager: manager, isAway: isAway});
    }

    return (
        <Fragment>
            <TopBar handleOpenProfileModal={openProfileModal}/>

            <div className="add-wrapper">
                <label htmlFor="addBuddy">Add a new buddy</label>
                <input id="addBuddy" type="image" src="addIcon.svg" width="30px" height="20" onClick={openCreateModal}/>
            </div>

            <Grid>
                <LeftLayout>
                    <input className="buddy-search" type="text" value={buddySearch} onChange={(e) => SetbuddySearch(e.target.value)}/>
                    <BuddiesList openEditModal={openEditModal} filter={buddySearch}/>
                </LeftLayout>

                <RightLayout>
                    <input className="pair-search" type="text"/>
                    <BuddiesPairList />
                </RightLayout>

                <ProfileModal isOpen={profileModalIsOpen} setOpen={setProfileModalIsOpen}/>
                <BuddyModal isOpen={buddyModalIsOpen} setOpen={setBuddyModalIsOpen}/>
                <EditModal isOpen={editModalIsOpen} setOpen={setEditModalIsOpen} BuddyStatus={editModalStatus}/>

            </Grid>
        </Fragment>
    );
}