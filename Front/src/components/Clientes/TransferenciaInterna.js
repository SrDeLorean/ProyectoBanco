import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Col, Row, Form, Button, Container, InputGroup, Tabs, Tab } from "@themesberg/react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { logout, startLogout } from "../../actions/auth";
import { transferenciaInterna } from "../../actions/transferencias";
import { TransferenciaExterna } from "./TransferenciaExterna";

export const TransferenciaInterna = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { cuentas } = useSelector((state) => state.cuentas);
  const [opcionesTI, setOpcionesTI] = useState([
    { value: "", label: "Selecciona una Cuenta..." },
  ]);
  const [saldoDisponibleTI, setSaldoDisponibleTI] = useState(0);
  const [montoTI, setMontoTI] = useState(0);
  const [cuentasTI, setCuentasTI] = useState({
    cuentaOrigen: "",
    saldoCuentaOrigen: "",
    cuentaDestino: "",
  });
  const cuentasID = {
    cuenta_corriente: 0,
    cuenta_ahorro: 1,
    cuenta_credito: 2,
  };

  // Transferencias Externas
  const [cuentasTE, setCuentasTE] = useState({
    cuentaOrigen: "",
    saldoCuentaOrigen: "",
    cuentaDestino: "",
  });

  const crearCuentasSelect = (cuentas) => {
    const opciones = [{ value: "", label: "Selecciona una Cuenta..." }];
    Object.entries(cuentas).map((cuenta, id) => {
      if (cuenta[0] == "cuenta_corriente") {
        opciones.push({
          value: cuenta[0] + "_" + cuenta[1].id,
          label: "Cuenta Corriente N° " + cuenta[1].id,
        });
      } else if (cuenta[0] == "cuenta_ahorro") {
        opciones.push({
          value: cuenta[0] + "_" + cuenta[1].id,
          label: "Cuenta Ahorro N° " + cuenta[1].id,
        });
      } else if (cuenta[0] == "cuenta_credito") {
        opciones.push({
          value: cuenta[0] + "_" + cuenta[1].id,
          label: "Cuenta Credito N° " + cuenta[1].id,
        });
      }
    });

    return opciones;
  };

  const obtenerCuentaSeleccionada = (valueSelect, cuentas) => {
    function obtenerCuenta(cuenta) {
      if (valueSelect[1] && cuenta[1].id) {
        if (cuenta[0] == "cuenta_corriente" && "corriente" == valueSelect[0]) {
          return 1;
        } else if (cuenta[0] == "cuenta_ahorro" && "ahorro" == valueSelect[0]) {
          return 1;
        } else if (
          cuenta[0] == "cuenta_credito" &&
          "credito" == valueSelect[0]
        ) {
          return 1;
        }
      }
    }
    var cuenta = Object.entries(cuentas).filter(obtenerCuenta);

    return cuenta;
  };

  const handleChangeOptionsOTI = (e) => {
    const valueSelect = e.target.value.replace("cuenta_", "").split("_");

    if (valueSelect[0] != "") {
      const cuenta = obtenerCuentaSeleccionada(valueSelect, cuentas);
      setSaldoDisponibleTI(cuenta[0][1].saldo);
      setCuentasTI({
        ...cuentasTI,
        cuentaOrigen: cuentasID[cuenta[0][0]],
        saldoCuentaOrigen: cuenta[0][1].saldo,
      });
    } else {
      setSaldoDisponibleTI(0);
      setCuentasTI({
        ...cuentasTI,
        cuentaOrigen: "",
        saldoCuentaOrigen: "",
      });
    }
  };

  const handleChangeOptionsDTI = (e) => {
    const valueSelect = e.target.value.replace("cuenta_", "").split("_");

    if (valueSelect[0] != "") {
      const cuenta = obtenerCuentaSeleccionada(valueSelect, cuentas);
      setCuentasTI({
        ...cuentasTI,
        cuentaDestino: cuentasID[cuenta[0][0]],
      });
    } else {
      setCuentasTI({
        ...cuentasTI,
        cuentaDestino: "",
      });
    }
  };

  const checkTI = (datosTI) => {
    const { cuentaOrigen, cuentaDestino, saldoCuentaOrigen } = datosTI;
    if (cuentaOrigen === "") {
      Swal.fire(
        "Transferencia Interna",
        "Seleccione una cuenta de origen",
        "error"
      );
      return false;
    } else if (cuentaDestino === "") {
      Swal.fire(
        "Transferencia Interna",
        "Seleccione una cuenta de Destino",
        "error"
      );
      return false;
    } else if (cuentaOrigen == cuentaDestino) {
      Swal.fire(
        "Transferencia Interna",
        "No se puede transferir a la misma cuenta de destino.",
        "error"
      );
      return false;
    } else if (montoTI == 0) {
      Swal.fire(
        "Transferencia Interna",
        "El monto a transferir debe ser mayor a 0.",
        "error"
      );
      return false;
    } else if (saldoCuentaOrigen - montoTI < 0) {
      Swal.fire(
        "Transferencia Interna",
        "El monto de la transferencia supera el saldo en tu cuenta de origen.",
        "error"
      );
      return false;
    }

    return true;
  };

  const actionTI = () => {
    if (checkTI(cuentasTI))
      dispatch(transferenciaInterna(cuentasTI, montoTI, history));
  };

  useEffect(() => {
    if (
      cuentas?.cuenta_corriente != null ||
      cuentas?.cuenta_ahorro != null ||
      cuentas?.cuenta_credito != null
    ) {
      setOpcionesTI(crearCuentasSelect(cuentas));
    } else {
      if (cuentas)
        Swal.fire(
          "Sin cuentas para trasnferir",
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

  const tiposCuentas = [
    { value: "", label: "Selecciona tipo de cuenta..." },
    { value: "Corriente", label: "Cuenta Corriente" },
    { value: "Ahorro", label: "Cuenta Ahorro" },
    { value: "Credito", label: "Cuenta Credito" },
  ];
  const bancos = [
    { value: "", label: "Selecciona un banco..." },
    { value: "BancoEstado", label: "BancoEstado" },
    { value: "Banco de Chile", label: "Banco de Chile" },
    { value: "Banco Santander", label: "Banco Santander" },
    {
      value: "Banco de Creditos e Inversiones",
      label: "Banco de Creditos e Inversiones",
    },
    { value: "Banco Itau", label: "Banco Itau" },
    { value: "Scotiabank Chile", label: "Scotiabank Chile" },
  ];
  return (
    <main>
      <section className="d-flex justify-content-center">
        <Container>
          {/* Se crean Tabs para navegar entre transacciones internar y externas */}
          <Tabs fill variant="pills" id="transferencias" unmountOnExit>
            {/* Contenido del Tab Transacciones Internas */}
            <Tab eventKey="interna" title="Transferencia Interna">
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-1000">
                <div className="text-center text-md-center mb-5 mt-md-0">
                      <h3 className="mb-0">Transferencia Interna</h3>
                    </div>
                    {/* Formulario Transferencia Interna */}
                    <Form>
                      {/* Distintos Inputs */}
                      <Row>
                          <Form.Group id="origenI" className="mb-4">
                            <Form.Label>Cuenta Origen</Form.Label>
                            <Form.Control
                              as="select"
                              onChange={handleChangeOptionsOTI}
                            >
                              {opcionesTI.map((opcion, key) => (
                                <option value={opcion.value} key={key}>
                                  {opcion.label}
                                </option>
                              ))}
                            </Form.Control>
                          </Form.Group>
                          <Form.Group id="destinoI" className="mb-4">
                            <Form.Label>Cuenta Destino</Form.Label>
                            <Form.Control
                              as="select"
                              onChange={handleChangeOptionsDTI}
                            >
                              {opcionesTI.map((opcion, key) => (
                                <option value={opcion.value} key={key}>
                                  {opcion.label}
                                </option>
                              ))}
                            </Form.Control>
                          </Form.Group>
                        <Col className="align-items-center justify-content-center">
                          <Form.Group id="montoI" className="mb-4">
                            <Form.Label>Monto a Transferir</Form.Label>
                            <InputGroup>
                              <InputGroup.Text>$</InputGroup.Text>
                              <Form.Control
                                required
                                type="text"
                                name="montoTI"
                                value={montoTI}
                                onChange={({ target }) => {
                                  setMontoTI(target.value);
                                }}
                                isInvalid={
                                  saldoDisponibleTI - montoTI < 0 ? true : false
                                }
                                placeholder="10.000.000"
                              />
                            </InputGroup>
                            {saldoDisponibleTI - montoTI < 0 ? (
                              <Form.Text className="text-muted">
                                <p style={{ color: "red" }}>
                                  {" "}
                                  Saldo Insuficiente para transferencia. Monto
                                  Disponible: {saldoDisponibleTI}
                                </p>
                              </Form.Text>
                            ) : (
                              <Form.Text className="text-muted">
                                Monto Disponible: {saldoDisponibleTI}
                              </Form.Text>
                            )}
                          </Form.Group>
                          {/* Boton submit */}
                          <Form.Group> 
                            <Button
                              variant="primary"
                              className="w-100 mt-2"
                              onClick={actionTI}
                              disabled={
                                saldoDisponibleTI - montoTI < 0 ? true : false
                              }
                            >
                              Realizar Transferencia
                            </Button>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </Col>
            </Tab>
            {/* Contenido del Tab Transacciones Externas */}
            <Tab eventKey="terceros" title="A Terceros">
              {/* Se crea el componenete Transferencia Externa */}
              <TransferenciaExterna />
            </Tab>
          </Tabs>
        </Container>
      </section>
    </main>
  );
};
