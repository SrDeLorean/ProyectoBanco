import React from "react";
import { useState, useEffect } from 'react'
import { Row, Button, ButtonGroup } from "@themesberg/react-bootstrap";

import { TablaClientes } from "../components/TablaClientes";
import { Routes } from "../constants/routes";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { api } from "./../constants/api.js";
import { Link } from "react-router-dom";


export const Clientes = () => {
  //const { usuarios } = useSelector((state) => state.usuarios);
  const [usuarios, setUsuarios] = useState([])

  const getUsuarios = () => {
    axios.get(api.route + "/usuarios")
      .then(resp => {
          setUsuarios(resp.data)
      })
      .catch(err => {
          console.log(err)
      });
  }
  useEffect(getUsuarios, [])
  
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>Clientes</h4>
          <p className="mb-0"></p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
            <Link to={Routes.CrearCliente.path}>
              <Button
                variant="outline-primary"
                size="sm"
              >
                Nuevo Cliente
              </Button>
            </Link>
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
