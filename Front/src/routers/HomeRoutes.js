import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../constants/routes";

// pages
import { Clientes } from "../pages/Clientes";
import { CrearCliente } from "../components/Clientes/CrearCliente";
import { EditarCliente } from "../components/Clientes/EditarCliente";
import { TransferenciaInterna } from "../components/Clientes/TransferenciaInterna";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";
import { useSelector } from "react-redux";
import { Inicio } from "../pages/Inicio";

export const HomeRoutes = () => {
  const [loaded, setLoaded] = useState(false);

  const { rol } = useSelector((state) => state.auth);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem("settingsVisible") === "false" ? false : true;
  };

  const [showSettings, setShowSettings] = useState(
    localStorageIsSettingsVisible,
  );

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem("settingsVisible", !showSettings);
  };

  return (
    <>
      <Preloader show={loaded ? false : true} />
      <Sidebar rol={rol} />

      <main className="content">
        <Navbar />
        {rol ? (
          rol == "admin" ? (
            <Switch>
              {/* pages */}

              <Route exact path={Routes.Clientes.path} component={Clientes} />

              <Route
                exact
                path={Routes.CrearCliente.path}
                component={CrearCliente}
              />

              <Route
                exact
                path={Routes.EditarCliente.path}
                component={EditarCliente}
              />

              <Redirect to={Routes.Clientes.path} />
            </Switch>
          ) : (
            <Switch>
              {/* pages */}

              <Route exact path={Routes.Inicio.path} component={Inicio} />
              <Route
                exact
                path={Routes.TransferenciaInterna.path}
                component={TransferenciaInterna}
              />

              <Redirect to={Routes.Inicio.path} />
            </Switch>
          )
        ) : (
          <div>Error...</div>
        )}

        <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
      </main>
    </>
  );
};
