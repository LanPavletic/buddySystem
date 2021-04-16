import React from 'react';

export const BuddiesPair = ({first, second}) => {

    return (
        <div className="buddies-pair">
            <span className="pair-span">{first}</span>
            <span className="pair-span">{second}</span>
        </div>
    );
}