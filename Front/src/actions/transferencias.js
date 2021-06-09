import axios from "axios";
import Swal from "sweetalert2";
import { api } from "../constants/api";
import { types } from "../constants/types";
import { transferenciasReducer } from "../reducers/transferenciasReducer";
import { cargarCuentasBD } from "./cuentas";

export const cargarTransferenciasBD = () => {
  return async (dispatch, getState) => {
    const transferencias = [];
    const config = JSON.parse(sessionStorage.getItem("config"));
    await axios
      .get(api.route + "/transferencias/externas", config)
      .then(async (respExt) => {
        await axios
          .get(api.route + "/transferencias/internas", config)
          .then((respInt) => {
            var transferencias = [];

            respExt.data.map((transferencia, index) => {});

            transferencias.push(respExt.data);
            transferencias.push(respInt.data);

            dispatch(
              cargarTransferencias(
                generalizarDatosTransferencias(respInt.data, respExt.data),
              ),
            );
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

const generalizarDatosTransferencias = (internas, externas) => {
  const data = [];

  internas.map((transferencia, index) => {
    data.push({
      cuenta: transferencia.cuenta_origen,
      fecha: transferencia.created_at.slice(0, 10),
      cargo: transferencia.monto,
      descripcion: "Transferencia Interna",
      saldo: "---",
    });
    data.push({
      cuenta: transferencia.cuenta_destino,
      fecha: transferencia.created_at.slice(0, 10),
      abono: transferencia.monto,
      descripcion: "Transferencia Interna",
      saldo: "---",
    });
  });

  externas.map((transferencia, index) => {
    data.push({
      cuenta: transferencia.tipo_cuenta_origen,
      fecha: transferencia.created_at.slice(0, 10),
      cargo: transferencia.monto,
      descripcion: "Transferencia Externa",
      saldo: "---",
    });
    /*data.push({
      cuenta: transferencia.cuenta_destino,
      fecha: transferencia.created_at,
      abono: transferencia.monto,
      descripcion: "Transferencia Externa",
      saldo: "---",
    });*/
  });

  data.sort((a, b) => {
    const fechaA = new Date(a.fecha).getTime();
    const fechaB = new Date(b.fecha).getTime();

    if (fechaA < fechaB) {
      return 1;
    }
    if (fechaA > fechaB) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });

  return data;
};

export const transferenciaInterna = (datosTI, monto, history) => {
  return async (dispatch) => {
    const config = JSON.parse(sessionStorage.getItem("config"));
    const datos = {
      cuenta_origen: datosTI.cuentaOrigen,
      cuenta_destino: datosTI.cuentaDestino,
      monto: monto,
    };

    await axios
      .post(api.route + "/transferencias/internas", datos, config)
      .then((resp) => {
        if (resp.data.status == 200)
          Swal.fire("", resp.data.msg, "success").then(() => {
            dispatch(cargarCuentasBD());
            dispatch(cargarTransferenciasBD());
            history.push("/TransferenciaInterna");
          });
        else Swal.fire("", resp.data.msg, "error");
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const transferenciaExterna = (datosTransferencia, history) => {
  return async (dispatch) => {
    const config = JSON.parse(sessionStorage.getItem("config"));
    const datos = {
      cuenta_origen: datosTransferencia.cuentaOrigen,
      cuenta_destino: datosTransferencia.cuentaDestino,
      monto: datosTransferencia.monto,
      banco: datosTransferencia.banco,
      tipo_origen: datosTransferencia.tipo_origen,
      tipo_destino: datosTransferencia.tipo_destino,
    };

    await axios
      .post(api.route + "/transferencias/externas", datos, config)
      .then((resp) => {
        if (resp.data.status == 200)
          Swal.fire("", resp.data.msg, "success").then(() => {
            dispatch(cargarCuentasBD());
            dispatch(cargarTransferenciasBD());
            history.push("/TransferenciaInterna");
          });
        else Swal.fire("", resp.data.msg, "error");
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const cargarTransferencias = (transferencias) => ({
  type: types.cargarTransferencias,
  payload: transferencias,
});
