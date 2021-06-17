import React, { useEffect, useState } from "react";
import Divider from "@material-ui/core/Divider";

import {
  Col,
  Row,
  Alert,
  Table,
  Container,
  Button,
  Tabs,
  Tab,
} from "@themesberg/react-bootstrap";
import { BalanceCuenta } from "./BalanceCuenta";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { startLogout } from "../../actions/auth";

export const Balance = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { cuentas } = useSelector((state) => state.cuentas);
  const { transferencias } = useSelector((state) => state.transferencias);
  const { auth } = useSelector((state) => state);
  const [balanceCuentas, setBalanceCuentas] = useState([]);
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

  const crearBalance = (cuentas, transferencias) => {
    const balances = [];
    Object.entries(cuentas).map((cuenta, id) => {
      if (cuenta[0] == "cuenta_corriente") {
        balances.push({
          tipoCuenta: "Cuenta Corriente",
          numeroCuenta: cuenta[1].id,
          transferencias: transferencias.filter(
            (transferencia) => transferencia.cuenta == 0
          ),
        });
      } else if (cuenta[0] == "cuenta_ahorro") {
        balances.push({
          tipoCuenta: "Cuenta Ahorro",
          numeroCuenta: cuenta[1].id,
          transferencias: transferencias.filter(
            (transferencia) => transferencia.cuenta == 1
          ),
        });
      } else if (cuenta[0] == "cuenta_credito") {
        balances.push({
          tipoCuenta: "Cuenta Credito",
          numeroCuenta: cuenta[1].id,
          transferencias: transferencias.filter(
            (transferencia) => transferencia.cuenta == 2
          ),
        });
      }
    });

    return balances;
  };

  useEffect(() => {
    if (
      (cuentas?.cuenta_corriente != null ||
        cuentas?.cuenta_ahorro != null ||
        cuentas?.cuenta_credito != null) &&
      transferencias
    ) {
      setBalanceCuentas(crearBalance(cuentas, transferencias));
    } else {
      if (cuentas)
        Swal.fire(
          "Sin cuentas para ver balances",
          "No tiene cuentas en el banco",
          "warning"
        ).then(() => {
          history.push("/inicio");
        });
      else
        Swal.fire(
          "Inactividad",
          "La sesión ha sido cerrada por inactividad.",
          "warning"
        ).then(() => {
          dispatch(startLogout());
        });
    }
  }, [cuentas]);

  if (!balanceCuentas) {
    return <div></div>;
  }

  return (
    <main>
      <section className="d-flex justify-content-center">
        <Container>
          <Tabs id="balances" unmountOnExit>
            {/* Tab para balance de cuenta corriente de Cliente */}
            {balanceCuentas.map((balance, key) => (
              <Tab key={key} eventKey={key} title={balance.tipoCuenta}>
                <BalanceCuenta
                  tipoCuenta={balance.tipoCuenta}
                  numCuenta={balance.numeroCuenta}
                  nombreCliente={auth.name}
                  transacciones={balance.transferencias}
                />
              </Tab>
            ))}

            {/*<Tab eventKey="balanceAhorro" title="Cuenta Ahorro">
              <Row className="justify-content-center form-bg-image" style={{}}>
                <Col
                  xs={12}
                  className="d-flex align-items-center justify-content-center"
                >
                  <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-1000">
                    <div className="mb-n1 text-end">
                      <Button variant="info" size="sm">
                        Exportar
                      </Button>
                    </div>
                    <div className="text-center text-md-center mb-4 mt-md-0">
                      {/* Nombre Cliente */}
            {/*<h5 className="mb-0">JUAN PEREZ PEREZ</h5>}
                      {/* Numero de Cuenta */}
            {/* <h5 className="mb-0">Cuenta Ahorro: 0000111122</h5>
                    </div>
                    {/* Aqui hay que iterar las transferencias que se obtengan de la bd 
                                            Arriba esta el mismo metodo que se utiliza con la tabla de Clientes, probablemente reusar
                                        */}
            {/* <Table
                      responsive
                      hover
                      bordered
                      className="user-table align-items-center"
                    >
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
              <Alert variant="danger">
                <Alert.Heading>Estimado Cliente</Alert.Heading>
                <p>
                  Usted no posee este tipo de Cuenta Bancaria. Por favor
                  contacte con su ejecutivo si desea crear una.
                </p>
              </Alert>
                   </Tab>*/}
          </Tabs>
        </Container>
      </section>
    </main>
  );
};
