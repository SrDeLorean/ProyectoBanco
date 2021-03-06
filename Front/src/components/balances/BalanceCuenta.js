import { Table, Card } from "@themesberg/react-bootstrap";
import React from "react";
import { useDispatch } from "react-redux";

export const BalanceCuenta = (props) => {
  const { tipoCuenta, numCuenta, nombreCliente, transacciones, saldo } = props;
  const dispatch = useDispatch();
  const token = JSON.parse(sessionStorage.getItem("token"));
  var cuenta = 0;
  switch (tipoCuenta) {
    case "Cuenta Corriente":
      cuenta = 0;
      break;
    case "Cuenta Credito":
      cuenta = 2;
      break;
    case "Cuenta Ahorro":
      cuenta = 1;
      break;
  }
  var url =
    "http://localhost:8000/api/cuentas/balance/exportar?tipocuenta=" +
    cuenta +
    "&token=" +
    token;

  return (
    <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-5 p-lg-5 pt-lg-4 w-100 fmxw-1000">
      <div className="mb-n1 text-end">
        <a href={url}>Exportar</a>
      </div>
      <div className="text-center text-md-center mb-4 mt-md-0">
        {/* Nombre Cliente */}
        <h4 className="mb-0">{nombreCliente}</h4>
        {/* Numero de Cuenta y el saldo disponible en dicha cuenta*/}
        <h5 className="mb-0">
          {tipoCuenta}: {numCuenta} | Saldo Disponible: ${saldo}
        </h5>
      </div>
      {/* Aqui hay que iterar las transferencias que se obtengan de la bd 
            Arriba esta el mismo metodo que se utiliza con la tabla de Clientes, probablemente reusar
          */}
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pt-0">
          {/* Tabla para presentar las transacciones */}
          <Table responsive hover className="user-table align-items-center">
            {/* Se crean los encabezados de la tabla */}
            <thead>
              <tr>
                <th className="border-bottom">Fecha</th>
                <th className="border-bottom">Cargo ($)</th>
                <th className="border-bottom">Abono ($)</th>
                <th className="border-bottom">Descripción</th>
                <th className="border-bottom">Saldo</th>
              </tr>
            </thead>
            {/* Se rellena la tabla con las transacciones obtenidas de la BD */}
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
