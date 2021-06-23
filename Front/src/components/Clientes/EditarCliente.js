import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import { validarRUT } from "validar-rut";
import { Link, useParams } from "react-router-dom";
import Switch from "@material-ui/core/Switch";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faEnvelope,
  faUnlockAlt,
} from "@fortawesome/free-solid-svg-icons";

import {
  Col,
  Row,
  Form,
  Card,
  Button,
  Container,
  InputGroup,
} from "@themesberg/react-bootstrap";

import { Routes } from "../../constants/routes";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { useForm } from "../../hooks/useForm";
import { editarCuenta } from "../../actions/cuentas";
import { editarUsuario } from "../../actions/usuarios";

export const EditarCliente = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);
  const { usuarios } = useSelector((state) => state.usuarios);
  //const { cuentas } = useSelector((state) => state.cuentas);

  const { id } = useParams();

  const [check, setCheck] = React.useState({
    checkCorriente: false,
    checkCredito: false,
    checkAhorro: false,
    saldoCuentaCorriente: 0,
    saldoCuentaAhorro: 0,
    saldoTarjetaCredito: 0,
  });
  //console.log(usuarios);

  const seleccionarUsuario = (id, usuarios) => {
    var usuarioSeleccionado = usuarios.filter(function (usuario) {
      return usuario.id == id;
    });

    return { ...usuarioSeleccionado[0], password: "" };
  };

  const [formValues, handleInputChange, reset] = useForm({});

  const isFormValid = () => {
    if (formValues.nombre.trim().length === 0) {
      Swal.fire("Error", "nombre vacio", "error");

      return false;
    } else if (!validator.isEmail(formValues.email)) {
      Swal.fire("Error", "Email no valido", "error");

      return false;
    } else if (formValues.password != "" && formValues.password.length <= 5) {
      Swal.fire(
        "Error",
        "La contraseña debe ser de 6 caracteres o mas",
        "error",
      );

      return false;
    } else if (formValues.rut.trim().length === 0) {
      Swal.fire("Error", "Rut de cliente vacio", "error");

      return false;
    } else if (!validarRUT(formValues.rut)) {
      Swal.fire("Error", "Rut de cliente invalido", "error");
      return false;
    }

    return true;
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    if (isFormValid()) {
      const datos = {
        nombre: formValues.nombre,
        rut: formValues.rut,
        email: formValues.email,
        rol: formValues.rol,
        password: formValues.password,

        cuenta_corriente: check.checkCorriente
          ? parseInt(check.saldoCuentaCorriente)
          : 0,
        cuenta_credito: check.checkCredito
          ? parseInt(check.saldoTarjetaCredito)
          : 0,
        cuenta_ahorro: check.checkAhorro
          ? parseInt(check.saldoCuentaAhorro)
          : 0,
      };

      await dispatch(editarUsuario(id, datos));
      //await dispatch(editarCuenta(id, datosCuentas, formValues.cuentas));
      //window.location.reload();
    }
  };

  useEffect(() => {
    if (usuarios) reset(seleccionarUsuario(id, usuarios));
    //if (cuentas) setCheck(seleccionarCuentasActivas(id, cuentas));
  }, [usuarios]);

  return (
    <main>
      <section className="d-flex justify-content-center ">
        <Container>
          {/* <p className="text-center">
            <Card.Link
              as={Link}
              to={Routes.Clientes.path}
              className="text-gray-700"
            >
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Volver
            </Card.Link>
          </p> */}

          <Row className="justify-content-center form-bg-image" style={{}}>
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="mb-2 mb-lg-0 bg-white shadow-soft border rounded border-light p-5 p-lg-5 pt-lg-4 w-100 fmxw-1000">
                <div className="mb-1 mt-n2 mx-n2 text-start">
                  <Button as={Link} to={Routes.Clientes.path} variant="outline-primary" size="sm">
                  <FontAwesomeIcon icon={faAngleLeft} className="me-2" />Volver
                  </Button>
                </div>
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Editar cliente</h3>
                </div>
                {usuarios /*&& cuentas*/ ? (
                  <Form>
                    <Row>
                      
                    <Form.Group id="rut" className="mb-4">
                      <Form.Label>Rut Cliente</Form.Label>
                      <InputGroup>
                        <InputGroup.Text></InputGroup.Text>
                        <Form.Control
                          autoFocus
                          required
                          type="text"
                          name="rut"
                          value={formValues.rut ? formValues.rut : ""}
                          onChange={handleInputChange}
                          placeholder="12345678-9"
                        />
                      </InputGroup>
                    </Form.Group>
                    <Col className="align-items-center ">
                    <Form.Group id="nombre" className="mb-4">
                      <Form.Label>Nombre Cliente</Form.Label>
                      <InputGroup>
                        <InputGroup.Text></InputGroup.Text>
                        <Form.Control
                          autoFocus
                          required
                          type="text"
                          name="nombre"
                          value={formValues.nombre ? formValues.nombre : ""}
                          onChange={handleInputChange}
                          placeholder="Nombre "
                        />
                      </InputGroup>
                    </Form.Group>
                    
                    <Form.Group id="email" className="mb-4">
                      <Form.Label>Correo Electrónico</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faEnvelope} />
                        </InputGroup.Text>
                        <Form.Control
                          autoFocus
                          required
                          type="email"
                          name="email"
                          value={formValues.email ? formValues.email : ""}
                          onChange={handleInputChange}
                          placeholder="example@company.com"
                        />
                      </InputGroup>
                    </Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Contraseña</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control
                          required
                          type="password"
                          name="password"
                          placeholder="Contraseña"
                          value={formValues.password ? formValues.password : ""}
                          onChange={handleInputChange}
                        />
                      </InputGroup>
                    </Form.Group>

                    
                    <Form.Group> 
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={handleEdit}
                        className="w-100"
                        disabled={loading}
                      >
                        Guardar Cliente
                      </Button>
                    </Form.Group>
                    </Col>
                    </Row>  
                  </Form>
                ) : (
                  <div>....</div>
                )}
                <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal"></span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
