import React from "react";
import Divider from '@material-ui/core/Divider';


import {Col,Row,Alert,Table,Container,Button,Tabs,Tab} from "@themesberg/react-bootstrap";

export const Balance = () => {

    /*const TableRow = (props) => {
        const { id, nombre, email } = props;
        return (
          <tr>
            <td>
              <span className="fw-normal">{nombre}</span>
            </td>
            <td>
              <span className="fw-normal">{email}</span>
            </td>
    
            <td>
              <Dropdown as={ButtonGroup}>
                <Dropdown.Toggle
                  as={Button}
                  split
                  variant="link"
                  className="text-dark m-0 p-0"
                >
                  <span className="icon icon-sm">
                    <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      history.push("Editar-cliente/" + id);
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} className="me-2" /> Editar
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="text-danger"
                    onClick={async () => {
                      dispatch(deleteUser(id));
                    }}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} className="me-2" />{" "}
                    Deshabilitar
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>
        );
      };*/


    return(
        <main>
            <section className="d-flex justify-content-center">
                <Container>
                    <Tabs id="balances" variant="pills" unmountOnExit>

                        {/* Tab para balance de cuenta corriente de Cliente */}
                        <Tab eventKey="balannceCorriente" title="Cuenta Corriente ">
                            <Row className="justify-content-center form-bg-image" style={{}}>
                                <Col xs = {12} className="d-flex align-items-center justify-content-center">
                                    <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-1000">
                                        <div className="mb-n1 text-end">
                                            <Button variant="info" size="sm">Exportar</Button>
                                        </div>
                                        <div className="text-center text-md-center mb-4 mt-md-0">
                                            {/* Nombre Cliente */}
                                            <h5 className="mb-0">JUAN PEREZ PEREZ</h5> 
                                            {/* Numero de Cuenta */}
                                            <h5 className="mb-0">Cuenta Corriente: 1234567890</h5>
                                        </div>
                                        {/* Aqui hay que iterar las transferencias que se obtengan de la bd 
                                            Arriba esta el mismo metodo que se utiliza con la tabla de Clientes, probablemente reusar
                                        */}
                                        <Table responsive hover bordered className="user-table align-items-center">
                                            <thead>
                                                <tr>
                                                    <th className="border-bottom">Fecha</th>
                                                    <th className="border-bottom">Cargo ($)</th>
                                                    <th className="border-bottom">Abono ($)</th>
                                                    <th className="border-bottom">Descripcion</th>
                                                    <th className="border-bottom">Saldo</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>10-05-2021</td>
                                                    <td>$200.000</td>
                                                    <td></td>
                                                    <td>Transferencia 1</td>
                                                    <td>$600.000</td>

                                                </tr>
                                                <tr>
                                                    <td>10-05-2021</td>
                                                    <td>$200.000</td>
                                                    <td></td>
                                                    <td>Transferencia 1</td>
                                                    <td>$600.000</td>

                                                </tr>
                                                <tr>
                                                    <td>10-05-2021</td>
                                                    <td>$200.000</td>
                                                    <td></td>
                                                    <td>Transferencia 1</td>
                                                    <td>$600.000</td>

                                                </tr>
                                                <tr>
                                                    <td>10-05-2021</td>
                                                    <td>$200.000</td>
                                                    <td></td>
                                                    <td>Transferencia 1</td>
                                                    <td>$600.000</td>

                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </Col>
                            </Row>
                        </Tab>

                        <Tab eventKey="balanceAhorro" title="Cuenta Ahorro">
                        <Row className="justify-content-center form-bg-image" style={{}}>
                                <Col xs = {12} className="d-flex align-items-center justify-content-center">

                                    <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-1000">
                                        <div className="mb-n1 text-end">
                                            <Button variant="info" size="sm">Exportar</Button>
                                        </div>
                                        <div className="text-center text-md-center mb-4 mt-md-0">
                                            {/* Nombre Cliente */}
                                            <h5 className="mb-0">JUAN PEREZ PEREZ</h5> 
                                            {/* Numero de Cuenta */}
                                            <h5 className="mb-0">Cuenta Ahorro: 0000111122</h5>
                                        </div>
                                        {/* Aqui hay que iterar las transferencias que se obtengan de la bd 
                                            Arriba esta el mismo metodo que se utiliza con la tabla de Clientes, probablemente reusar
                                        */}
                                        <Table responsive hover bordered className="user-table align-items-center">
                                            <thead>
                                                <tr>
                                                    <th className="border-bottom">Fecha</th>
                                                    <th className="border-bottom">Cargo ($)</th>
                                                    <th className="border-bottom">Abono ($)</th>
                                                    <th className="border-bottom">Descripcion</th>
                                                    <th className="border-bottom">Saldo</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>10-05-2021</td>
                                                    <td>$200.000</td>
                                                    <td></td>
                                                    <td>Transferencia 1</td>
                                                    <td>$600.000</td>

                                                </tr>
                                                <tr>
                                                    <td>10-05-2021</td>
                                                    <td>$200.000</td>
                                                    <td></td>
                                                    <td>Transferencia 1</td>
                                                    <td>$600.000</td>

                                                </tr>
                                                <tr>
                                                    <td>10-05-2021</td>
                                                    <td>$200.000</td>
                                                    <td></td>
                                                    <td>Transferencia 1</td>
                                                    <td>$600.000</td>

                                                </tr>
                                                <tr>
                                                    <td>10-05-2021</td>
                                                    <td>$200.000</td>
                                                    <td></td>
                                                    <td>Transferencia 1</td>
                                                    <td>$600.000</td>

                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </Col>
                            </Row>
                        </Tab>

                        <Tab eventKey="balanceCredito" title="Cuenta Credito">
                            <Alert variant="danger" >
                                <Alert.Heading>Estimado Cliente</Alert.Heading>
                                <p>
                                Usted no posee este tipo de Cuenta Bancaria. Por favor contacte con su ejecutivo si desea crear una.
                                </p>
                            </Alert>
                        </Tab>
                    </Tabs>
                </Container>
            </section>
        </main>
    );
};