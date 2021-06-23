import { Button, Col, Row, Table , Card} from "@themesberg/react-bootstrap";
import React from "react";
import { useDispatch } from "react-redux";
import { exportarBalance } from "../../actions/cuentas";

export const BalanceCuenta = (props) => {
  const { tipoCuenta, numCuenta, nombreCliente, transacciones } = props;
  const dispatch = useDispatch();
  return (
        <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-5 p-lg-5 pt-lg-4 w-100 fmxw-1000">
          <div className="mb-n1 text-end">
            <Button
              variant="info"
              size="sm"
              onClick={() => {
                dispatch(exportarBalance());
              }}
            >
              Exportar
            </Button>
          </div>
          <div className="text-center text-md-center mb-4 mt-md-0">
            {/* Nombre Cliente */}
            <h4 className="mb-0">{nombreCliente}</h4>
            {/* Numero de Cuenta */}
            <h5 className="mb-0">
              {tipoCuenta}: {numCuenta} | Saldo Disponible: ?
            </h5>
          </div>
          {/* Aqui hay que iterar las transferencias que se obtengan de la bd 
            Arriba esta el mismo metodo que se utiliza con la tabla de Clientes, probablemente reusar
          */}
          <Card border="light" className="table-wrapper table-responsive shadow-sm">
            <Card.Body className="pt-0">
          <Table
            responsive
            hover
            className="user-table align-items-center" 
          >
            <thead>
              <tr>
                <th className="border-bottom">Fecha</th>
                <th className="border-bottom">Cargo ($)</th>
                <th className="border-bottom">Abono ($)</th>
                <th className="border-bottom">Descripción</th>
                <th className="border-bottom">Saldo</th>
              </tr>
            </thead>
            <tbody>
              {transacciones.map((transaccion, index) => {
                if (transaccion.abono) {
                  return (
                    <tr key={index}>
                      <td>{transaccion.fecha}</td>
                      <td></td>
                      <td>${transaccion.abono}</td>
                      <td>{transaccion.descripcion}</td>
                      <td>{transaccion.saldo}</td>
                    </tr>
                  );
                } else if (transaccion.cargo) {
                  return (
                    <tr key={index}>
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
          </Card.Body>
          </Card>
        </div>
  );
};
