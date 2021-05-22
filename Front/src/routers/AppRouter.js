import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { AuthRouter } from "./AuthRouter";
import { PrivateRoute } from "./PrivateRoute";

import { startCheking } from "../actions/auth";
import { PublicRoute } from "./PublicRoute";
import { HomeRoutes } from "./HomeRoutes";

import Preloader from "../components/Preloader";

export const AppRouter = () => {
  const dispatch = useDispatch();

  const { checking, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startCheking());
  }, [dispatch]);

  if (checking) {
    return <Preloader></Preloader>;
  }

  return (
    <Router>
      <Switch>
        <PublicRoute
          path="/auth"
          component={AuthRouter}
          isAuthenticated={!!uid}
        />

        <PrivateRoute isAuthenticated={!!uid} path="/" component={HomeRoutes} />

        <Redirect to="/auth/login" />
      </Switch>
    </Router>
  );
};
