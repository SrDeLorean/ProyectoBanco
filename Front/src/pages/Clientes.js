import React from "react";

import { Row, Button, ButtonGroup } from "@themesberg/react-bootstrap";

import { TablaClientes } from "../components/TablaClientes";
import { Routes } from "../constants/routes";

import { useDispatch, useSelector } from "react-redux";

export const Clientes = () => {
  const { usuarios } = useSelector((state) => state.usuarios);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>Clientes</h4>
          <p className="mb-0"></p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
            <Button
              variant="outline-primary"
              size="sm"
              href={Routes.CrearCliente.path}
            >
              Nuevo Cliente
            </Button>
          </ButtonGroup>
        </div>
      </div>

      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center"></Row>
      </div>

      <TablaClientes usuarios={usuarios} />
    </>
  );
};
