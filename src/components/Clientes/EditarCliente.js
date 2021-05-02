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
  const { cuentas } = useSelector((state) => state.cuentas);

  const { id } = useParams();

  const [check, setCheck] = React.useState({});

  const seleccionarUsuario = (id, usuarios) => {
    var usuarioSeleccionado = usuarios.filter(function (usuario) {
      return usuario.Id == id;
    });

    return usuarioSeleccionado[0];
  };

  const [formValues, handleInputChange, reset] = useForm({});

  const isFormValid = () => {
    if (formValues.nombre.trim().length === 0) {
      Swal.fire("Error", "nombre vacio", "error");

      return false;
    } else if (!validator.isEmail(formValues.correo)) {
      Swal.fire("Error", "Email no valido", "error");

      return false;
    } else if (formValues.clave.length <= 5) {
      Swal.fire(
        "Error",
        "La contraseña debe ser de 6 caracteres o mas",
        "error"
      );

      return false;
    } else if (formValues.rut.trim().length === 0) {
      Swal.fire("Error", "Rut de cliente vacio", "error");

      return false;
    } else if (!validarRUT(formValues.rut)) {
      Swal.fire("Error", "Rut de cliente invalido", "error");
      return false;
    }
    if (check.checkCorriente) {
      if (check.saldoCuentaCorriente < 0) {
        Swal.fire(
          "Error",
          "El saldo de la cuenta corriente debe ser mayor o igual a 0",
          "error"
        );

        return false;
      }
    }
    if (check.checkAhorro) {
      if (check.saldoCuentaAhorro < 0) {
        Swal.fire(
          "Error",
          "El saldo de la cuenta de ahorro debe ser mayor o igual a 0",
          "error"
        );
        return false;
      }
    }
    if (check.checkCredito) {
      if (check.saldoTarjetaCredito < 0) {
        Swal.fire(
          "Error",
          "El saldo de la tarjeta de credito debe ser mayor o igual a 0",
          "error"
        );

        return false;
      }
    }
    return true;
  };

  const handleChange = (e) => {
    setCheck({
      ...check,
      [e.target.name]: e.target.checked,
    });
  };

  const handleInputChangeCheck = ({ target }) => {
    setCheck({
      ...check,
      [target.name]: target.value,
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    if (isFormValid()) {
      const datos = {
        //podria ir el rut aqui como id
        nombre: formValues.nombre,
        clave: formValues.clave,
        rut: formValues.rut,
        correo: formValues.correo,
        rol: formValues.rol,
        cuentas: formValues.cuentas,
      };

      const datosCuentas = {
        ...check,
      };

      await dispatch(editarCuenta(id, datosCuentas, formValues.cuentas));
      window.location.reload();
    }
  };

  const seleccionarCuentasActivas = (id, cuentas) => {
    var checkAux = {
      checkCorriente: false,
      checkCredito: false,
      checkAhorro: false,
      saldoCuentaCorriente: 0,
      saldoCuentaAhorro: 0,
      saldoTarjetaCredito: 0,
    };

    cuentas.map((cuenta) => {
      if (cuenta.dueño == id) {
        if (cuenta.tipo == "corriente") {
          checkAux.checkCorriente = cuenta.activa;
          checkAux.saldoCuentaCorriente = cuenta.saldo;
        }
        if (cuenta.tipo == "ahorro") {
          checkAux.checkAhorro = cuenta.activa;
          checkAux.saldoCuentaAhorro = cuenta.saldo;
        }
        if (cuenta.tipo == "credito") {
          checkAux.checkCredito = cuenta.activa;
          checkAux.saldoTarjetaCredito = cuenta.saldo;
        }
      }
    });
    return checkAux;
  };

  useEffect(() => {
    if (usuarios) reset(seleccionarUsuario(id, usuarios));
    if (cuentas) setCheck(seleccionarCuentasActivas(id, cuentas));
  }, [usuarios, cuentas]);

  return (
    <main>
      <section className="d-flex justify-content-center ">
        <Container>
          <p className="text-center">
            <Card.Link
              as={Link}
              to={Routes.Clientes.path}
              className="text-gray-700"
            >
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Volver
            </Card.Link>
          </p>
          <Row className="justify-content-center form-bg-image" style={{}}>
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Editar cliente</h3>
                </div>
                {usuarios && cuentas ? (
                  <Form className="mt-4">
                    <Form.Group id="rut" className="mb-4">
                      <Form.Label>Rut Cliente</Form.Label>
                      <InputGroup>
                        <InputGroup.Text></InputGroup.Text>
                        <Form.Control
                          autoFocus
                          required
                          disabled
                          type="text"
                          name="rut"
                          value={formValues.rut ? formValues.rut : ""}
                          onChange={handleInputChange}
                          placeholder="12345678-9"
                        />
                      </InputGroup>
                    </Form.Group>
                    <Form.Group id="rut" className="mb-4">
                      <Form.Label>Nombre Cliente</Form.Label>
                      <InputGroup>
                        <InputGroup.Text></InputGroup.Text>
                        <Form.Control
                          autoFocus
                          required
                          disabled
                          type="text"
                          name="nombre"
                          value={formValues.nombre ? formValues.nombre : ""}
                          onChange={handleInputChange}
                          placeholder="Nombre "
                        />
                      </InputGroup>
                    </Form.Group>
                    <Form.Group id="email" className="mb-4">
                      <Form.Label>Correo Electronico</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faEnvelope} />
                        </InputGroup.Text>
                        <Form.Control
                          autoFocus
                          required
                          disabled
                          type="email"
                          name="correo"
                          value={formValues.correo ? formValues.correo : ""}
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
                          disabled
                          type="password"
                          name="clave"
                          placeholder="Contraseña"
                          value={formValues.clave ? formValues.clave : ""}
                          onChange={handleInputChange}
                        />
                      </InputGroup>
                    </Form.Group>

                    <Form.Group id="Corriente" className="mb-4">
                      <Row>
                        <Col
                          xs={12}
                          className="align-items-center justify-content-center"
                        >
                          <FormControlLabel
                            control={
                              <Switch
                                checked={
                                  check.checkCorriente
                                    ? check.checkCorriente
                                    : false
                                }
                                onChange={handleChange}
                                name="checkCorriente"
                              />
                            }
                            label="Cuenta Corriente"
                          />
                        </Col>
                        <Col>
                          <Form.Control
                            type="number"
                            placeholder="0"
                            disabled={!check.checkCorriente ? "disabled" : ""}
                            name="saldoCuentaCorriente"
                            value={
                              check.saldoCuentaCorriente
                                ? check.saldoCuentaCorriente
                                : 0
                            }
                            onChange={handleInputChangeCheck}
                          />
                        </Col>
                      </Row>
                    </Form.Group>

                    <Form.Group id="Ahorro" className="mb-4">
                      <Row>
                        <Col
                          xs={12}
                          className="align-items-center justify-content-center"
                        >
                          <FormControlLabel
                            control={
                              <Switch
                                checked={
                                  check.checkAhorro ? check.checkAhorro : false
                                }
                                onChange={handleChange}
                                name="checkAhorro"
                              />
                            }
                            label="Cuenta Ahorro"
                          />
                        </Col>
                        <Col>
                          <Form.Control
                            type="number"
                            placeholder="0"
                            disabled={!check.checkAhorro ? "disabled" : ""}
                            name="saldoCuentaAhorro"
                            value={
                              check.saldoCuentaAhorro
                                ? check.saldoCuentaAhorro
                                : 0
                            }
                            onChange={handleInputChangeCheck}
                          />
                        </Col>
                      </Row>
                    </Form.Group>

                    <Form.Group id="Credito" className="mb-4">
                      <Row>
                        <Col
                          xs={12}
                          className="align-items-center justify-content-center"
                        >
                          <FormControlLabel
                            control={
                              <Switch
                                checked={
                                  check.checkCredito
                                    ? check.checkCredito
                                    : false
                                }
                                onChange={handleChange}
                                name="checkCredito"
                              />
                            }
                            label="Tarjeta de crédito"
                          />
                        </Col>
                        <Col>
                          <Form.Control
                            type="number"
                            placeholder="0"
                            disabled={!check.checkCredito ? "disabled" : ""}
                            name="saldoTarjetaCredito"
                            value={
                              check.saldoTarjetaCredito
                                ? check.saldoTarjetaCredito
                                : 0
                            }
                            onChange={handleInputChangeCheck}
                          />
                        </Col>
                      </Row>
                    </Form.Group>

                    <Button
                      variant="primary"
                      type="submit"
                      onClick={handleEdit}
                      className="w-100"
                      disabled={loading}
                    >
                      Guardar Cliente
                    </Button>
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
