import { Button, Col, Row, Table } from "@themesberg/react-bootstrap";
import React from "react";

export const BalanceCuenta = (props) => {
  const { tipoCuenta, numCuenta, nombreCliente, transacciones } = props;
  return (
    <Row className="justify-content-center form-bg-image" style={{}}>
      <Col xs={12} className="d-flex align-items-center justify-content-center">
        <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-1000">
          <div className="mb-n1 text-end">
            <Button variant="info" size="sm">
              Exportar
            </Button>
          </div>
          <div className="text-center text-md-center mb-4 mt-md-0">
            {/* Nombre Cliente */}
            <h5 className="mb-0">{nombreCliente}</h5>
            {/* Numero de Cuenta */}
            <h5 className="mb-0">
              {tipoCuenta}: {numCuenta}
            </h5>
          </div>
          {/* Aqui hay que iterar las transferencias que se obtengan de la bd 
                                            Arriba esta el mismo metodo que se utiliza con la tabla de Clientes, probablemente reusar
                                        */}
          <Table
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
              {transacciones.map((transaccion, index) => {
                if (transaccion.abono) {
                  return (
                    <tr>
                      <td>{transaccion.fecha}</td>
                      <td></td>
                      <td>${transaccion.abono}</td>
                      <td>{transaccion.descripcion}</td>
                      <td>{transaccion.saldo}</td>
                    </tr>
                  );
                } else if (transaccion.cargo) {
                  return (
                    <tr>
                      <td>{transaccion.fecha}</td>
                      <td>${transaccion.cargo}</td>
                      <td></td>
                      <td>{transaccion.descripcion}</td>
                      <td>{transaccion.saldo}</td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </Table>
        </div>
      </Col>
    </Row>
  );
};