import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useHistory } from 'react-router-dom';

export const AuthLayout = () => {

    let history = useHistory();
    const [loginStatus, setLoginStatus] = useState({
        username: '',
        password: ''
    });
    const [errorLabel, setErrorLabel] = useState('');

    const handleChange = e => {
        setLoginStatus({...loginStatus, [e.target.name]: e.target.value});
    }

    const handleClick = e => {
        if (!(loginStatus.username && loginStatus.password)) {
            setErrorLabel('please enter the fields')
        } else {
            setErrorLabel('');
        }
        Meteor.loginWithPassword(loginStatus.username, loginStatus.password, (err) => {
            // the user has entered an incorrect username or password
            if (err?.reason === 'User not found' || err?.reason === 'Incorrect password') {
                setErrorLabel('the username or password is incorrect.')
            }
            // alerting the user in case of unexpacted error.
            else if (err) {
                window.alert('an unknown error has occurred. Please try again.')
            }
            // succesful login
            else {
                history.replace('/')
            }
        });
    }

    return (
        <form className="login-wrapper">
            <h1>Login</h1>
            <label htmlFor="username" ></label>
            <input type="text" placeholder="username" name="username" onChange={handleChange}/>
            <label htmlFor="password"></label>
            <input type="password" placeholder="password" name="password" onChange={handleChange}/>
            <label className="errorLabel" style={{color: "red", fontSize: "12px"}}>{errorLabel}</label>
            <input type="button" value="login" onClick={handleClick}/>
        </form>
    );
}