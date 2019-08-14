import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

export default function Routes() {
  return (
    <Switch>
      <Route patch="/" exact component={SignIn} />
      <Route patch="/register" component={SignUp} />

      <Route patch="/dashboard" component={Dashboard} />
      <Route patch="/profile" component={Profile} />
    </Switch>
  );
}
