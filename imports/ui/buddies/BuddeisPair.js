import React from 'react';

export const BuddiesPair = ({first, second, third}) => {

    return (
        <div className="buddies-pair">
            <span className="pair-span">{first}</span>
            <span className="pair-span">{second}</span>
            <span className="pair-span">{third}</span>
        </div>
    );
}