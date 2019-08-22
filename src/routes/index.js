import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';
import MeetupDetails from '~/pages/Meetup/MeetupDetails';
import MeetupForm from '~/pages/Meetup/MeetupForm';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/meetups/new" component={MeetupForm} isPrivate />
      <Route path="/meetups/:id/edit" component={MeetupForm} isPrivate />
      <Route path="/meetups/:id" component={MeetupDetails} isPrivate />
    </Switch>
  );
}
