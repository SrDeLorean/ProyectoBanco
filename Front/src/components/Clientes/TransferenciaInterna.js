import React from "react";
import Divider from '@material-ui/core/Divider';
import {Col,Row,Form,Button,Container,InputGroup,Tabs,Tab} from "@themesberg/react-bootstrap";

export const TransferenciaInterna = () => {
    const opciones = [
        {value: "", label:"Selecciona una Cuenta..."},
        {value: "prueba1", label:"Cuenta Corriente N° 1234567890"},
        {value: "prueba2", label:"Cuenta Ahorro N° 1234567890"},
        {value: "prueba3", label:"Cuenta Credito N° 1234567890"},          
    ];
    const tiposCuentas = [
        {value: "", label:"Selecciona tipo de cuenta..."},
        {value:"Corriente", label:"Cuenta Corriente"},
        {value:"Ahorro", label:"Cuenta Ahorro"},
        {value:"Credito", label:"Cuenta Credito"},
    ];
    const bancos = [
        {value: "", label:"Selecciona un banco..."},
        {value:"BancoEstado", label:"BancoEstado"},
        {value:"Banco de Chile", label:"Banco de Chile"},
        {value:"Banco Santander", label:"Banco Santander"},
        {value:"Banco de Creditos e Inversiones", label:"Banco de Creditos e Inversiones"},
        {value:"Banco Itau", label:"Banco Itau"},
        {value:"Scotiabank Chile", label:"Scotiabank Chile"},
    ];
    return(
        <main>
            <section className="d-flex justify-content-center">
                <Container>
                    <Tabs id="transferencias" unmountOnExit>
                        <Tab eventKey="interna" title="Transferencia Interna">
                            <Row className="justify-content-center form-bg-image" style={{}}>
                                <Col xs = {12} className="d-flex align-items-center justify-content-center">
                                    <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-1000">
                                        <div className="text-center text-md-center mb-5 mt-md-0">
                                            <h3 className="mb-0">Transferencia Interna</h3>
                                        </div>
                                        <Form>
                                            <Row>
                                                <Col>
                                                    <Form.Group id="origenI" className="mb-4">
                                                        <Form.Label>Cuenta Origen</Form.Label>
                                                        <Form.Control as="select">
                                                            {opciones.map((opcion) => (
                                                            <option value={opcion.value}>{opcion.label}</option>
                                                            ))}
                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Form.Group id="destinoI" className="mb-4">
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
                                                    <Form.Group id="montoI" className="mb-4">
                                                        <Form.Label>Monto a Transferir</Form.Label>
                                                        <InputGroup>
                                                            <InputGroup.Text>$</InputGroup.Text>
                                                            <Form.Control
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
                        </Tab>

                        <Tab eventKey="terceros" title="A Terceros">
                            <Col xs = {12} className="d-flex align-items-center justify-content-center">
                                <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-1000">
                                    <div className="text-center text-md-center mb-5 mt-md-0">
                                        <h3 className="mb-0">A Terceros</h3>
                                    </div>
                                    <Form>
                                        <Row>
                                            <Form.Group as={Col} id="origenT" className="mb-4">
                                                <Form.Label>Cuenta Origen</Form.Label>
                                                <Form.Control as="select">
                                                    {opciones.map((opcion) => (
                                                    <option value={opcion.value}>{opcion.label}</option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group as={Col} id="saldoT" className="mb-4">
                                                <Form.Label>Saldo</Form.Label>
                                                <Form.Control placeholder="$" disabled></Form.Control>
                                            </Form.Group>
                                        </Row>

                                        <Divider></Divider>

                                        <Form.Group id="banco" className="mb-4 mt-4">
                                            <Form.Label>Banco del destinatario</Form.Label>
                                            <Form.Control as="select">
                                                {bancos.map((banco) => (
                                                <option value={banco.value}>{banco.label}</option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group id="tipoCuenta" className="mb-4">
                                            <Form.Label>Tipo de Cuenta</Form.Label>
                                            <Form.Control as="select">
                                                {tiposCuentas.map((tipo) => (
                                                <option value={tipo.value}>{tipo.label}</option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group id="rutDestinatario" className="mb-4">
                                            <Form.Label>Rut Destinatario</Form.Label>
                                            <Form.Control placeholder="11.111.111-1"></Form.Control>
                                        </Form.Group>
                                        <Form.Group id="cuentaDestinatario" className="mb-4">
                                            <Form.Label>Cuenta Destinatario</Form.Label>
                                            <Form.Control placeholder="0000 0000 0000 0000"></Form.Control>
                                        </Form.Group>
                                        <Divider></Divider>

                                        <Form.Group id="montoT" className="mb-4 mt-4">
                                            <Form.Label>Monto</Form.Label>
                                            <Form.Control placeholder="$1000"></Form.Control>
                                        </Form.Group>   
                                        <Form.Group className="justify-content-center mt-2">
                                            <Button
                                                variant="primary"
                                                className="w-100 mt-2"
                                            >
                                                Realizar Transferencia
                                            </Button>
                                        </Form.Group>                                                            
                                    </Form>
                                </div>
                            </Col>
                        </Tab>
                    </Tabs>
                    
                </Container>
            </section>
        </main>
    );
};