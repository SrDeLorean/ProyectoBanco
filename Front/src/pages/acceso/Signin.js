import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUnlockAlt,  faPiggyBank, } from "@fortawesome/free-solid-svg-icons";

import {
  Col,
  Row,
  Form,
  Button,
  Container,
  InputGroup,
} from "@themesberg/react-bootstrap";
import BgImage from "../../assets/img/signin.svg";

import { useForm } from "../../hooks/useForm";
import { startLoginEmailPassword } from "../../actions/auth";

export default () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    rut: "",
    password: "",
  });

  const { rut, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLoginEmailPassword(rut, password));
  };

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row
            className="justify-content-center form-bg-image"
            style={{ backgroundImage: `url(${BgImage})` }}
          >
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
              <div className="text-center text-md-center mb-4 mt-md-0">
                  <FontAwesomeIcon icon={faPiggyBank} size="lg" className="me-2" />
                  <h2 className="mb-0">Bienvenido a Proyecto Banco </h2>
                </div>
                {/* <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Inicia sesión </h3>
                </div> */}
                <Form className="mt-4" onSubmit={handleLogin}>
                  <Form.Group id="rut" className="mb-4">
                    <Form.Label>RUT</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control
                        autoFocus
                        required
                        type="rut"
                        name="rut"
                        placeholder="19123876-1"
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
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
                          placeholder="Password"
                          onChange={handleInputChange}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    disabled={loading}
                  >
                    Iniciar Sesión
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
