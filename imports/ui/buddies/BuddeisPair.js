import React from 'react';

export const BuddiesPair = ({first, second}) => {

    return (
        <div className="buddies-pair">
            <span className="pair-span">{first.name} {first.surname}</span>
            <span className="pair-span">{second.name} {second.surname}</span>
        </div>
    );
}