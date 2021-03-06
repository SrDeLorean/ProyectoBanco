import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup } from "@themesberg/react-bootstrap";
import { TablaClientes } from "../components/TablaClientes";
import { Routes } from "../constants/routes";
import axios from "axios";
import { api } from "./../constants/api.js";
import { cargarCuentasBD } from "../actions/cuentas";

export const Clientes = () => {
  //const { usuarios } = useSelector((state) => state.usuarios);
  const [usuarios, setUsuarios] = useState([]);
  const dispatch = useDispatch();

  const getUsuarios = () => {
    const config = JSON.parse(sessionStorage.getItem("config"));
    axios
      .get(api.route + "/usuarios", config)
      .then((resp) => {
        setUsuarios(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(getUsuarios, []);

  return (
    <>
      {/* Pagina principal para Administradores */}
      <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-1000">
        <div className="mb-n1 text-end">
          {/* Boton para Crear nuevos Clientes */}
          <ButtonGroup>
            <Link to={Routes.CrearCliente.path}>
              <Button variant="outline-primary" size="sm">
                Nuevo Cliente
              </Button>
            </Link>
          </ButtonGroup>
        </div>
        <div className="text-center text-md-center mb-4 mt-md-0">
          <h3 className="mb-0">Clientes</h3>
        </div>
        {/* Creacion componente TablaClientes */}
        <TablaClientes usuarios={usuarios} />
      </div>
    </>
  );
};
