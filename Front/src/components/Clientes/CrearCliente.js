import React from "react";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import { validarRUT } from "validar-rut";
import { Link } from "react-router-dom";
import Switch from "@material-ui/core/Switch";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, Container, InputGroup } from "@themesberg/react-bootstrap";
import { Routes } from "../../constants/routes";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useForm } from "../../hooks/useForm";
import { startRegisterWithEmailPasswordName } from "../../actions/auth";
import { useHistory } from "react-router-dom";

export const CrearCliente = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading } = useSelector((state) => state.ui);

  const [check, setCheck] = React.useState({
    checkCorriente: false,
    checkCredito: false,
    checkAhorro: false,
  });

  const [formValues, handleInputChange, inputChange] = useForm({
    nombre: "",
    rut: "",
    email: "",
    password: "",

    saldoCuentaCorriente: 0,

    saldoTarjetaCredito: 0,

    saldoCuentaAhorro: 0,
  });

  const {
    email,
    password,
    nombre,
    rut,
    saldoCuentaCorriente,
    saldoTarjetaCredito,
    saldoCuentaAhorro,
  } = formValues;

  const isFormValid = () => {
    if (nombre.trim().length === 0) {
      Swal.fire("Error", "nombre vacio", "error");

      return false;
    } else if (!validator.isEmail(email)) {
      Swal.fire("Error", "Email no valido", "error");

      return false;
    } else if (password.length <= 5) {
      Swal.fire(
        "Error",
        "La contraseña debe ser de 6 caracteres o mas",
        "error"
      );

      return false;
    } else if (rut.trim().length === 0) {
      Swal.fire("Error", "Rut de cliente vacio", "error");

      return false;
    } else if (!validarRUT(rut)) {
      Swal.fire("Error", "Rut de cliente invalido", "error");
      return false;
    }
    if (check.checkCorriente) {
      if (saldoCuentaCorriente <= 0) {
        Swal.fire(
          "Error",
          "El saldo de la cuenta corriente debe ser mayor a 0",
          "error"
        );

        return false;
      }
    }
    if (check.checkAhorro) {
      if (saldoCuentaAhorro <= 0) {
        Swal.fire(
          "Error",
          "El saldo de la cuenta de ahorro debe ser mayor a 0",
          "error"
        );
        return false;
      }
    }
    if (check.checkCredito) {
      if (saldoTarjetaCredito <= 0) {
        Swal.fire(
          "Error",
          "El saldo de la tarjeta de credito debe ser mayor a 0",
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

  const handleRegister = async (e) => {
    e.preventDefault();

    if (isFormValid()) {
      /*const datos = {
        //podria ir el rut aqui como id
        nombre: nombre,
        clave: password,
        rut: rut,
        correo: email,
        rol: "normal",
        cuentas: {
          corriente: 0,
          ahorro: 0,
          credito: 0,
        },
      };*/

      const cuentas = {
        saldoCuentaCorriente: check.checkCorriente
          ? parseInt(saldoCuentaCorriente)
          : 0,
        saldoTarjetaCredito: check.checkCredito
          ? parseInt(saldoTarjetaCredito)
          : 0,
        saldoCuentaAhorro: check.checkAhorro ? parseInt(saldoCuentaAhorro) : 0,
      };

      //console.log(cuentas);
      await dispatch(
        await startRegisterWithEmailPasswordName(
          email,
          password,
          nombre,
          rut,
          cuentas,
          history
        )
      );
    }
  };

  return (
    <main>
      <section className="d-flex justify-content-center ">
        <Container>
          <Row className="justify-content-center form-bg-image" style={{}}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                {/* Boton para volver a la vista de inicio */}
                <div className="mb-1 mt-n2 mx-n2 text-start">
                  <Button as={Link} to={Routes.Clientes.path} variant="outline-primary" size="sm">
                    <FontAwesomeIcon icon={faAngleLeft} className="me-2" />Volver
                  </Button>
                </div>
                {/* Titulo */}
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Crear cliente</h3>
                </div>
                {/* Formulario para la creacion de usuarios tipo cliente (administrador solo hay uno) */}
                <Form className="mt-4">
                  {/* Distintos inputs */}
                  <Form.Group id="rut" className="mb-4">
                    <Form.Label>Rut Cliente</Form.Label>
                    <InputGroup>
                      <InputGroup.Text></InputGroup.Text>
                      <Form.Control
                        autoFocus
                        required
                        type="text"
                        name="rut"
                        value={rut}
                        onChange={handleInputChange}
                        placeholder="12345678-9"
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="nombre" className="mb-4">
                    <Form.Label>Nombre Cliente</Form.Label>
                    <InputGroup>
                      <InputGroup.Text></InputGroup.Text>
                      <Form.Control
                        autoFocus
                        required
                        type="text"
                        name="nombre"
                        value={nombre}
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
                        value={email}
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
                        value={password}
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
                              checked={check.checkCorriente}
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
                          value={saldoCuentaCorriente}
                          onChange={handleInputChange}
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
                              checked={check.checkAhorro}
                              onChange={handleChange}
                              name="checkAhorro"
                            />
                          }
                          label="Cuenta de Ahorros"
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          type="number"
                          placeholder="0"
                          disabled={!check.checkAhorro ? "disabled" : ""}
                          name="saldoCuentaAhorro"
                          value={saldoCuentaAhorro}
                          onChange={handleInputChange}
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
                              checked={check.checkCredito}
                              onChange={handleChange}
                              name="checkCredito"
                            />
                          }
                          label="Cuenta de Crédito"
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          type="number"
                          placeholder="0"
                          disabled={!check.checkCredito ? "disabled" : ""}
                          name="saldoTarjetaCredito"
                          value={saldoTarjetaCredito}
                          onChange={handleInputChange}
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                  {/* Boton submit */}
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleRegister}
                    className="w-100"
                    disabled={loading}
                  >
                    Crear Cliente
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
