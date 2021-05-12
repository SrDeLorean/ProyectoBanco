import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Signin from "../pages/acceso/Signin";

export const AuthRouter = () => {
  return (
    <div className="auth__main">
      <div className="auth__box-container">
        <Switch>
          <Route exact path="/auth/login" component={Signin} />

          <Route exact path="/auth/Signin" component={Signin} />

          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </div>
  );
};
