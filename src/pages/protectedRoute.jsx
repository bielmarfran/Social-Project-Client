import React from "react";
import { Redirect, Route } from "react-router-dom";

function protectedRoute({ isAuth: isAuth, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return <Component />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location, error: "Unauthorized access" },
              }}
            />
          );
        }
      }}
    />
  );
}

export default protectedRoute;
