import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Route, Redirect } from 'react-router';

export const ProtectedRoute  = ({component: Component, ...rest}) => {

    // if the user is not logged in, he is redirected to login page.
    return (
        <Route
        {...rest}
        render={({location}) => {
            if (Meteor.user()) {
                return (
                    <Component />
                )
            }
            else {
                return (
                <Redirect to={{
                    pathname: "/login",
                    state: {from: location}
                }}/>)
            }
        }}
        />
    );
}