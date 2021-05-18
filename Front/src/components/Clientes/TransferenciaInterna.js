import React from "react";
import Divider from '@material-ui/core/Divider';


import {Col,Row,Form,Button,Container,InputGroup} from "@themesberg/react-bootstrap";

export const TransferenciaInterna = () => {
    const opciones = [
        {value: "", label:"Selecciona una Cuenta..."},
        {value: "prueba", label:"Cuenta Corriente N° 1234567890"},
        {value: "prueba", label:"Cuenta Ahorro N° 1234567890"},
        {value: "prueba", label:"Cuenta Credito N° 1234567890"},          
    ];

    return(
        <main>
            <section className="d-flex justify-content-center">
                <Container>
                    <Row className="justify-content-center form-bg-image" style={{}}>
                        <Col xs = {12} className="d-flex align-items-center justify-content-center">
                            <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-1000">
                                <div className="text-center text-md-center mb-5 mt-md-0">
                                    <h3 className="mb-0">Transferencia Interna</h3>
                                </div>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Group id="cuentaOrigen" className="mb-4">
                                                <Form.Label>Cuenta Origen</Form.Label>
                                                <Form.Control as="select">
                                                    {opciones.map((opcion) => (
                                                    <option value={opcion.value}>{opcion.label}</option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group id="cuentaDestino" className="mb-4">
                                                <Form.Label>Cuenta Destino</Form.Label>
                                                <Form.Control as="select">
                                                    {opciones.map((opcion) => (
                                                    <option value={opcion.value}>{opcion.label}</option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>
                                        </Col >
                                        <Divider orientation="vertical"></Divider>
                                                        
                                        <Col className="align-items-center justify-content-center">
                                            <Form.Group id="monto" className="mb-4">
                                                <Form.Label>Monto a Transferir</Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Text>$</InputGroup.Text>
                                                    <Form.Control
                                                        autoFocus
                                                        required
                                                        type="text"
                                                        name="monto"                                                        
                                                        placeholder="10.000.000"
                                                    />
                                                </InputGroup>
                                                <Form.Text className="text-muted">
                                                Monto Disponible: $10.000.000
                                                </Form.Text>
                                            </Form.Group>
                                            <Form.Group>
                                                <Button
                                                    variant="primary"
                                                    className="w-100 mt-2"
                                                >
                                                    Realizar Transferencia
                                                </Button>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    );
};