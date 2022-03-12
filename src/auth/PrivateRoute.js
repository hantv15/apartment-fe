import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticate } from '.';

const PrivateRoute = ({children}) => {
  return <Route render={() => {
      return isAuthenticate() ? children : <Redirect to={{ pathname: "/"}}/>
  }}/>
};

export default PrivateRoute;
