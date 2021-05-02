import React from "react";
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
import { Link } from "react-router-dom";

import { Routes } from "../../constants/routes";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import Switch from "@material-ui/core/Switch";
import { useForm } from "../../hooks/useForm";

export const EditarCliente = () => {
  const [state, setState] = React.useState({
    checkCorriente: false,
    checkCredito: false,
    checkAhorro: false,
  });

  const [formValues, handleInputChange] = useForm({
    nombre: "",
    rut: "",
    email: "",
    password: "",
    checkCorriente: true,
    checkCredito: true,
    checkAhorro: true,
  });

  const {
    email,
    password,
    nombre,
    rut,
    checkCorriente,
    checkCredito,
    checkAhorro,
  } = formValues;

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };
  return (
    <main>
      <section className="d-flex align-items-left ">
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
                <Form className="mt-4">
                  <Form.Group id="rut" className="mb-4">
                    <Form.Label>Rut Cliente</Form.Label>
                    <InputGroup>
                      <InputGroup.Text></InputGroup.Text>
                      <Form.Control
                        autoFocus
                        required
                        type="text"
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
                        type="text"
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
                        type="email"
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
                        placeholder="Contraseña"
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
                              checked={state.checkCorriente}
                              onChange={handleChange}
                              name="checkCorriente"
                            />
                          }
                          label="Cuenta Corriente"
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          placeholder="ww"
                          disabled={!state.checkCorriente ? "disabled" : ""}
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
                              checked={state.checkAhorro}
                              onChange={handleChange}
                              name="checkAhorro"
                            />
                          }
                          label="Cuenta Ahorro"
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          placeholder="ww"
                          disabled={!state.checkAhorro ? "disabled" : ""}
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
                              checked={state.checkCredito}
                              onChange={handleChange}
                              name="checkCredito"
                            />
                          }
                          label="Tarjeta de crédito"
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          placeholder="ww"
                          disabled={!state.checkCredito ? "disabled" : ""}
                        />
                      </Col>
                    </Row>
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100">
                    Guardar Cambios
                  </Button>
                </Form>

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
