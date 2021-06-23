import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../constants/routes";

// pages
import { Clientes } from "../pages/Clientes";
import { CrearCliente } from "../components/Clientes/CrearCliente";
import { EditarCliente } from "../components/Clientes/EditarCliente";
import { TransferenciaInterna } from "../components/Clientes/TransferenciaInterna";
import { Balance } from "../components/balances/Balance";

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
      {/* Vista que se muestra al cargar las distintas vistas */}
      <Preloader show={loaded ? false : true} />
      {/* Barra de Navegacion (Barra superior) */}
      <Navbar rol={rol}/>
      <main>
        <div className="d-flex align-items-center justify-content-center mt-2">
          {rol ? (
            rol == "admin" ? (
              <Switch>
                {/* Rutas permitidas como Administrador */}
                <Route exact path={Routes.Clientes.path} component={Clientes} />
                <Route exact path={Routes.CrearCliente.path} component={CrearCliente}/>
                <Route exact path={Routes.EditarCliente.path} component={EditarCliente}/>
                
                {/* En caso de ingresar a alguna ruta no permitida, la pagina redirige al usuario a la Vista de Administracion de Clientes */}
                <Redirect to={Routes.Clientes.path} />
              </Switch>
            ) : (
              <Switch>
                {/*Rutas permitidas como Cliente*/}
                <Route exact path={Routes.Inicio.path} component={Inicio} />
                <Route exact path={Routes.TransferenciaInterna.path} component={TransferenciaInterna}/>
                <Route exact path={Routes.Balance.path} component={Balance} />

                {/* En caso de ingresar a alguna ruta no permitida, la pagina redirige al usuario a la Vista de Inicio */}
                <Redirect to={Routes.Inicio.path} />
              </Switch>
            )
          ) : (
            <div>Error...</div>
          )}
        </div>
      </main>
      {/* Componente Footer */}
      <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
    </>
  );
};
