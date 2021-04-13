import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useApplyJobContext } from "../contexts/AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const usersContext = useApplyJobContext();

  return (
    <Route
      {...rest}
      render={(props) => {
        return usersContext.adminUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
