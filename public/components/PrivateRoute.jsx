import React from 'react';
import { Redirect, Route } from 'react-router';

import * as AuthService from './Auth/auth.service';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    AuthService.getAuth() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }} />
    )
  )} />
);

/*
const PrivateRoute = (props) => (
  <Route {...props.routeProps} render={() => (
    props.authenticated ? (
      <div>{props.children}</div>
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }} />
    )
  )} />
);

const mapStateToProps = (state) => {
  return {
    authenticated: state._auth.authenticated
  };
};
*/
//const ConnectedPrivateRoute = connect(mapStateToProps, null)(PrivateRoute);

export default PrivateRoute;