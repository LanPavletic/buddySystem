import React from 'react';
import { BuddiesPair } from './BuddeisPair';

export const BuddiesPairList = () => {

    const pairs = [
        {
            first: {
                name: "Lan",
                surname: "Pavletič"
            },
            second: {
                name: "Jože",
                surname: "Neki"
            }
        },
        {
            first: {
                name: "Lan",
                surname: "Pavletič"
            },
            second: {
                name: "Jože",
                surname: "Neki"
            }
        },
        {
            first: {
                name: "Lan",
                surname: "Pavletič"
            },
            second: {
                name: "Jože",
                surname: "Neki"
            }
        },
        {
            first: {
                name: "Lan",
                surname: "Pavletič"
            },
            second: {
                name: "Jože",
                surname: "Neki"
            }
        },
        {
            first: {
                name: "Lan",
                surname: "Pavletič"
            },
            second: {
                name: "Jože",
                surname: "Neki"
            }
        },
        {
            first: {
                name: "Lan",
                surname: "Pavletič"
            },
            second: {
                name: "Jože",
                surname: "Neki"
            }
        },
        {
            first: {
                name: "Lan",
                surname: "Pavletič"
            },
            second: {
                name: "Jože",
                surname: "Neki"
            }
        },
        {
            first: {
                name: "Lan",
                surname: "Pavletič"
            },
            second: {
                name: "Jože",
                surname: "Neki"
            }
        },
        {
            first: {
                name: "Lan",
                surname: "Pavletič"
            },
            second: {
                name: "Jože",
                surname: "Neki"
            }
        },
        {
            first: {
                name: "Lan",
                surname: "Pavletič"
            },
            second: {
                name: "Jože",
                surname: "Neki"
            }
        },
        {
            first: {
                name: "Lan",
                surname: "Pavletič"
            },
            second: {
                name: "Jože",
                surname: "Neki"
            }
        },
        {
            first: {
                name: "Lan",
                surname: "Pavletič"
            },
            second: {
                name: "Jože",
                surname: "Neki"
            }
        },
        {
            first: {
                name: "Lan",
                surname: "Pavletič"
            },
            second: {
                name: "Jože",
                surname: "Neki"
            }
        }
    ]

    return (
        <div>
            <h2 className="list-label" onClick={() => Meteor.call('buddies.pair')}>Make pairs</h2>
            <div className="list-wrapper">
                <ul>
                    {pairs.map((pair) => <BuddiesPair first={pair.first} second={pair.second}  />)}
                </ul>
            </div>
        </div>
    );
}