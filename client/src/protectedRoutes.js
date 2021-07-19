import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoutes = ({ isAuth, component: Component, ...rest }) => {
  const adminToken = localStorage.getItem("adminToken");
  const userToken = localStorage.getItem("userToken");
  const token = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth && (adminToken || userToken || token)) {
          return <Component />;
        } else {
          return (
            <Redirect
              to={{ pathname: "/signIn", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoutes;
