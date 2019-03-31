import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

function SecuredRoute({ component: Component, loggedIn, ...componentProps }) {
  return (
    <Route
      {...componentProps}
      render={props => (loggedIn ? <Component {...props} /> : <Redirect to="/auth" />)}
    />
  );
}

SecuredRoute.defaultProps = {
  loggedIn: false
};

SecuredRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  loggedIn: PropTypes.bool
};

export default SecuredRoute;
