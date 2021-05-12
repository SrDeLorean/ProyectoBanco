import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  InputGroup,
} from "@themesberg/react-bootstrap";

export const GeneralInfoForm = () => {
  const [birthday, setBirthday] = useState("");

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Información General</h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ingrese su nombre"
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Apellido</Form.Label>
                <Form.Control required type="text" placeholder="Apellido" />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="birthday">
                <Form.Label>Cumpleaños</Form.Label>
                <Datetime
                  timeFormat={false}
                  onChange={setBirthday}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        value={
                          birthday ? moment(birthday).format("DD/MM/YYYY") : ""
                        }
                        placeholder="dd/mm/aaaa"
                        onFocus={openCalendar}
                        onChange={() => {}}
                      />
                    </InputGroup>
                  )}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>Género</Form.Label>
                <Form.Select defaultValue="0">
                  <option value="0">Hombre</option>
                  <option value="1">Mujer</option>
                  <option value="2">Otro</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="nombre@email.com"
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>Número</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="+56 9 4512 6910"
                />
              </Form.Group>
            </Col>
          </Row>

          <h5 className="my-4">Dirección</h5>
          <Row>
            <Col sm={9} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ingrese su Dirección"
                />
              </Form.Group>
            </Col>
            <Col sm={3} className="mb-3">
              <Form.Group id="addressNumber">
                <Form.Label>Número</Form.Label>
                <Form.Control required type="number" placeholder="No." />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={4} className="mb-3">
              <Form.Group id="city">
                <Form.Label>Región</Form.Label>
                <Form.Control required type="text" placeholder="Ciudad" />
              </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
              <Form.Group className="mb-2">
                <Form.Label>Selecionar Comuna</Form.Label>
                <Form.Select id="state" defaultValue="0">
                  <option value="0">Comuna</option>
                  <option value="AL">Arica</option>
                  <option value="AK">Putre</option>
                  <option value="AZ">Iquique</option>
                  <option value="AR">Antofagasta</option>
                  <option value="CA">Calama</option>
                  <option value="CO">Santiago</option>
                  <option value="CT">Maule</option>
                  <option value="DE">Talca</option>
                  <option value="DC">Curico</option>
                  <option value="FL">Copiapó</option>
                  <option value="GA">Cerro navia</option>
                  <option value="HI">Las Condes</option>
                  <option value="ID">Providencia</option>
                  <option value="IL">Macul</option>
                  <option value="IN">Lo prado</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group id="zip">
                <Form.Label>Código Postal</Form.Label>
                <Form.Control required type="tel" placeholder="Código Postal" />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
