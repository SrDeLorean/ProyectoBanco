import React, { useEffect, useState } from "react";
import { Container, Tabs, Tab } from "@themesberg/react-bootstrap";
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
          {/* Se crean Tabs para navegar entre los distintos tipos de cuenta*/}
          {/* Cabe destacar que solo se podra navegar a traves de los tipos de cuenta que el cliente posea */}
          <Tabs fill variant="pills" id="balances" unmountOnExit>
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
          </Tabs>
          </Container>
      </section>
    </main>
  );
};
