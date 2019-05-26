import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import {isAuth} from './auth';
import Login from './pages/login';
import Artists from './pages/artists';
// import Artist from './pages/artist';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuth ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute path="/callback" component={Artists} />
      <Route exact path="/" component={Login} />
      {/* <Route path="/artists/:id" component={Artist} />  */}
    </Switch>
  </BrowserRouter>
);

export default Routes;