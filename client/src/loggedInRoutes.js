import React from "react";
import { Route, Redirect } from "react-router-dom";

const LoggedInRoutes = ({ isAuth, component: Component, ...rest }) => {
  const adminToken = localStorage.getItem("adminToken");
  const userToken = localStorage.getItem("userToken");
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth && (adminToken || userToken)) {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        } else {
          return <Component />;
        }
      }}
    />
  );
};

export default LoggedInRoutes;
