import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import {
  Col,
  Row,
  Form,
  Button,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { startLogout } from "../../actions/auth";
import { transferenciaExterna } from "../../actions/transferencias";

export const TransferenciaExterna = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { cuentas } = useSelector((state) => state.cuentas);
  const [opciones, setOpciones] = useState([
    { value: "", label: "Selecciona una Cuenta..." },
  ]);
  const [saldoDisponible, setSaldoDisponible] = useState(0);
  const [monto, setMonto] = useState(0);
  const [datosTransferencia, setDatosTransferencia] = useState({
    cuentaOrigen: "",
    tipo_origen: "",
    saldoCuentaOrigen: "",
    cuentaDestino: "",
    banco: "",
    tipo_destino: "",
    monto: 0,
  });
  const cuentasID = {
    cuenta_corriente: 0,
    cuenta_ahorro: 1,
    cuenta_credito: 2,
  };

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

  const handleChangeOptions = (e) => {
    const valueSelect = e.target.value.replace("cuenta_", "").split("_");

    if (valueSelect[0] != "") {
      const cuenta = obtenerCuentaSeleccionada(valueSelect, cuentas);
      setSaldoDisponible(cuenta[0][1].saldo);
      setDatosTransferencia({
        ...datosTransferencia,
        cuentaOrigen: cuenta[0][1].id,
        tipo_origen: cuentasID[cuenta[0][0]],
        saldoCuentaOrigen: cuenta[0][1].saldo,
      });
    } else {
      setSaldoDisponible(0);
      setDatosTransferencia({
        ...datosTransferencia,
        cuentaOrigen: "",
        tipo_origen: "",
        saldoCuentaOrigen: "",
      });
    }
  };

  const handleChangeOptionsBanco = (e) => {
    const valueSelect = e.target.value;

    if (valueSelect[0] != "") {
      setDatosTransferencia({
        ...datosTransferencia,
        banco: valueSelect[0],
      });
    } else {
      setDatosTransferencia({
        ...datosTransferencia,
        cuentaDestino: "",
      });
    }
  };

  const handleChangeOptionsTipoCuenta = (e) => {
    const valueSelect = e.target.value;

    if (valueSelect[0] != "") {
      setDatosTransferencia({
        ...datosTransferencia,
        tipo_destino: valueSelect[0],
      });
    } else {
      setDatosTransferencia({
        ...datosTransferencia,
        tipo_destino: "",
      });
    }
  };

  const checkDatos = (datosTI) => {
    const {
      cuentaOrigen,
      tipo_origen,
      cuentaDestino,
      saldoCuentaOrigen,
      tipo_destino,
      banco,
    } = datosTI;
    const regexNumerico = new RegExp("^[0-9]+$");
    if (cuentaOrigen === "") {
      Swal.fire(
        "Transferencia Externa",
        "Seleccione una cuenta de origen",
        "error"
      );
      return false;
    }
    if (banco === "") {
      Swal.fire(
        "Transferencia Externa",
        "Seleccione un Banco para la cuenta de destino",
        "error"
      );
      return false;
    }
    if (tipo_destino === "") {
      Swal.fire(
        "Transferencia Externa",
        "Seleccione un tipo de cuenta de destino",
        "error"
      );
      return false;
    } else if (cuentaDestino === "" || !regexNumerico.test(cuentaDestino)) {
      Swal.fire(
        "Transferencia Externa",
        "Ingrese una cuenta de Destino Valida",
        "error"
      );
      return false;
    } else if (
      banco == 1 &&
      tipo_destino == tipo_origen &&
      cuentaOrigen == cuentaDestino
    ) {
      Swal.fire(
        "Transferencia Externa",
        "No se puede transferir a la misma cuenta de origen.",
        "error"
      );
      return false;
    } else if (monto == 0) {
      Swal.fire(
        "Transferencia Externa",
        "El monto a transferir debe ser mayor a 0.",
        "error"
      );
      return false;
    } else if (saldoCuentaOrigen - monto < 0) {
      Swal.fire(
        "Transferencia Externa",
        "El monto de la transferencia supera el saldo en tu cuenta de origen.",
        "error"
      );
      return false;
    } else if (validarTransferenciaInt(cuentaDestino, tipo_destino, banco)) {
      Swal.fire(
        "Transferencia Externa",
        "Solo se pueden realizar trasnferencias externas, si desea realizar una transferencia interna cambie a la pestaña Transferencia Internas.",
        "warning"
      );
      return false;
    }

    return true;
  };

  const validarTransferenciaInt = (cuentaDest, tipoCuentaDes, banco) => {
    let validar = false;
    if (banco == 1) {
      Object.entries(cuentas).map((cuenta, id) => {
        if (cuenta[0] == "cuenta_corriente" && tipoCuentaDes == 0) {
          if (cuentaDest == cuenta[1].id) {
            validar = true;
          }
        } else if (cuenta[0] == "cuenta_ahorro" && tipoCuentaDes == 1) {
          if (cuentaDest == cuenta[1].id) {
            validar = true;
          }
        } else if (cuenta[0] == "cuenta_credito" && tipoCuentaDes == 2) {
          if (cuentaDest == cuenta[1].id) {
            validar = true;
          }
        }
      });
    }

    return validar;
  };

  const actionTransferir = () => {
    if (checkDatos(datosTransferencia))
      dispatch(
        transferenciaExterna({ ...datosTransferencia, monto: monto }, history)
      );
  };

  useEffect(() => {
    if (
      cuentas?.cuenta_corriente != null ||
      cuentas?.cuenta_ahorro != null ||
      cuentas?.cuenta_credito != null
    ) {
      setOpciones(crearCuentasSelect(cuentas));
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
  }, [cuentas, datosTransferencia]);

  const tiposCuentas = [
    { value: "", label: "Selecciona tipo de cuenta..." },
    { value: "0", label: "Cuenta Corriente" },
    { value: "1", label: "Cuenta Ahorro" },
    { value: "2", label: "Cuenta Credito" },
  ];
  const bancos = [
    { value: "", label: "Selecciona un banco..." },
    { value: "1", label: "Banco Utalca" },
    { value: "0", label: "Otro" },
  ];
  return (
    <Col xs={12} className="d-flex align-items-center justify-content-center">
      <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-1000">
        <div className="text-center text-md-center mb-5 mt-md-0">
          <h3 className="mb-0">A Terceros</h3>
        </div>
        <Form>
          <Row>
            <Form.Group as={Col} id="origenT" className="mb-4">
              <Form.Label>Cuenta Origen</Form.Label>
              <Form.Control as="select" onChange={handleChangeOptions}>
                {opciones.map((opcion, key) => (
                  <option value={opcion.value} key={key}>
                    {opcion.label}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} id="saldoT" className="mb-4">
              <Form.Label>Saldo</Form.Label>
              <InputGroup>
                <InputGroup.Text disabled>$</InputGroup.Text>
                <Form.Control
                  placeholder="0"
                  value={saldoDisponible}
                  disabled
                ></Form.Control>
              </InputGroup>
            </Form.Group>
          </Row>

          <Divider></Divider>

          <Form.Group id="banco" className="mb-4 mt-4">
            <Form.Label>Banco del destinatario</Form.Label>
            <Form.Control as="select" onChange={handleChangeOptionsBanco}>
              {bancos.map((banco, key) => (
                <option value={banco.value} key={key}>
                  {banco.label}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group id="tipoCuenta" className="mb-4">
            <Form.Label>Tipo de Cuenta</Form.Label>
            <Form.Control as="select" onChange={handleChangeOptionsTipoCuenta}>
              {tiposCuentas.map((tipo, key) => (
                <option value={tipo.value} key={key}>
                  {tipo.label}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          {/* 
          <Form.Group id="rutDestinatario" className="mb-4">
            <Form.Label>Rut Destinatario</Form.Label>
            <Form.Control placeholder="11.111.111-1"></Form.Control>
          </Form.Group>
          */}
          <Form.Group id="cuentaDestinatario" className="mb-4">
            <Form.Label>Cuenta Destinatario</Form.Label>
            <Form.Control
              type="number"
              min="1"
              placeholder="0000 0000 0000 0000"
              onChange={({ target }) => {
                setDatosTransferencia({
                  ...datosTransferencia,
                  cuentaDestino: target.value,
                });
              }}
            ></Form.Control>
          </Form.Group>
          <Divider></Divider>

          <Form.Group id="montoT" className="mb-4 mt-4">
            <Form.Label>Monto</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="0000"
                name="monto"
                value={monto}
                onChange={({ target }) => {
                  setMonto(target.value);
                }}
                isInvalid={saldoDisponible - monto < 0 ? true : false}
              ></Form.Control>
            </InputGroup>

            {saldoDisponible - monto < 0 ? (
              <Form.Text className="text-muted">
                <p style={{ color: "red" }}>
                  {" "}
                  Saldo Insuficiente para transferencia. Monto Disponible: ${" "}
                  {saldoDisponible}
                </p>
              </Form.Text>
            ) : (
              <Form.Text className="text-muted">
                Monto Disponible: ${saldoDisponible}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="justify-content-center mt-2">
            <Button
              variant="primary"
              className="w-100 mt-2"
              onClick={actionTransferir}
              disabled={saldoDisponible - monto < 0 ? true : false}
            >
              Realizar Transferencia
            </Button>
          </Form.Group>
        </Form>
      </div>
    </Col>
  );
};
