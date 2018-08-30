import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const PrivateRoute = ({
  component: Component,
  authed,
  redirectPathname,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: redirectPathname, state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
