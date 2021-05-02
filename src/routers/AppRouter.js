import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import { useDispatch } from "react-redux";

import { db, firebase } from "../api/firebase-config";
import { AuthRouter } from "./AuthRouter";
import { PrivateRoute } from "./PrivateRoute";

import { login } from "../actions/auth";
import { PublicRoute } from "./PublicRoute";
import { HomeRoutes } from "./HomeRoutes";

import Preloader from "../components/Preloader";
import { cargarUsuariosBD } from "../actions/usuarios";
import { cargarCuentasBD } from "../actions/cuentas";

export const AppRouter = () => {
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName, user.phoneNumber));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }

      if (user?.uid) {
        await db
          .collection("Usuarios")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.data().rol === "admin") {
              console.log("usario admin");
              dispatch(cargarUsuariosBD());
              dispatch(cargarCuentasBD());
            } else {
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      }

      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);

  if (checking) {
    return <Preloader></Preloader>;
  }

  return (
    <Router>
      <Switch>
        <PublicRoute
          path="/auth"
          component={AuthRouter}
          isAuthenticated={isLoggedIn}
        />

        <PrivateRoute
          isAuthenticated={isLoggedIn}
          path="/"
          component={HomeRoutes}
        />

        <Redirect to="/auth/login" />
      </Switch>
    </Router>
  );
};
