import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../constants/routes";

// pages
import { Clientes } from "../pages/Clientes";
import { CrearCliente } from "../components/Clientes/CrearCliente";
import { EditarCliente } from "../components/Clientes/EditarCliente";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

export const HomeRoutes = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem("settingsVisible") === "false" ? false : true;
  };

  const [showSettings, setShowSettings] = useState(
    localStorageIsSettingsVisible
  );

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem("settingsVisible", !showSettings);
  };

  return (
    <>
      <Preloader show={loaded ? false : true} />
      <Sidebar />

      <main className="content">
        <Navbar />
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

        <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
      </main>
    </>
  );
};
