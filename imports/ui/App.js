import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { AuthLayout } from './layout/AuthLayout';
import { MainLayout } from './layout/MainLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './Stylesheets/global.css';



export const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" component={AuthLayout}/>
          <ProtectedRoute path="/" component={MainLayout}/>
        </Switch>
      </div>
    </Router>
  );
};
