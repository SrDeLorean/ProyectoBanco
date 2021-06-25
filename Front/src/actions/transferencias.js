import axios from "axios";
import Swal from "sweetalert2";
import { api } from "../constants/api";
import { types } from "../constants/types";
import { cargarCuentasBD } from "./cuentas";

/**
 * Cargar las trannsferencias que se convertiran en el balance.
 */
export const cargarTransferenciasBD = () => {
  return async (dispatch, getState) => {
    const transferencias = [];
    const config = JSON.parse(sessionStorage.getItem("config"));
    const uid = JSON.parse(sessionStorage.getItem("uid"));

    // Petición get para obtener la información del balance.
    await axios.get(api.route + "/cuentas/balance", config).then((resp) => {
      var balance = [];

      //const { uid } = getState().auth;

      // Almacena la información de la respuesta de la api en un array
      if (resp.data) {
        console.log(resp.data);
        if (resp.data.msg != "El usuario no posee este tipo de cuenta.")
          balance.push(...resp.data);
      }
      // crea el balance y lo estandariza para ser tratados de forma correcta por el front
      // ademas lo almacena en el store de redux
      crearBalance(balance, uid, dispatch);
    });
  };
};

/**
 * Toma los datos obtenidos de la api, que viene en el balance
 * para generalizar los datos y ser guardados en el redux.
 * @param {array} balance
 * @param {string} uid
 * @param {function} dispatch
 */
const crearBalance = (balance, uid, dispatch) => {
  const data = [];
  // separa las transacciones en internas y externas.
  const externas = balance.filter((transaccion) => {
    return transaccion.hasOwnProperty("tipo_cuenta_destino");
  });

  const internas = balance.filter((transaccion) => {
    return !transaccion.hasOwnProperty("tipo_cuenta_destino");
  });
  // generaliza y guarda en el redux
  dispatch(
    cargarTransferencias(
      generalizarDatosTransferencias(internas, externas, uid)
    )
  );
};

/**
 * Generaliza los datos para ser tratados por el front y ordena
 * las transacciones por la fecha.
 * @param {array} internas
 * @param {array} externas
 * @param {string} uid
 * @returns {array} datos generalizados y ordenados
 */
const generalizarDatosTransferencias = (internas, externas, uid) => {
  const data = [];

  // Toma los datos necesarios y al se internas crea el abono y cargo
  // en el balance.
  internas.map((transferencia, index) => {
    data.push({
      cuenta: transferencia.cuenta_origen,
      fecha: transferencia.created_at.slice(0, 10),
      fechaCompleta: transferencia.created_at,
      cargo: transferencia.monto,
      descripcion: "Transferencia Interna",
      saldo: transferencia.saldo,
    });
    data.push({
      cuenta: transferencia.cuenta_destino,
      fecha: transferencia.created_at.slice(0, 10),
      fechaCompleta: transferencia.created_at,

      abono: transferencia.monto,
      descripcion: "Transferencia Interna",
      saldo: transferencia.saldo_destino,
    });
  });

  // Toma los datos necesarios y al ser externas crea el abono o cargo
  // dependiendo de si el usuario realizo la transacción o no, y guarda
  // los datos.
  externas.map((transferencia, index) => {
    console.log(uid, transferencia.cliente_id);
    if (uid == transferencia.cliente_id)
      data.push({
        cuenta: transferencia.tipo_cuenta_origen,
        fecha: transferencia.created_at.slice(0, 10),
        fechaCompleta: transferencia.created_at,
        cargo: transferencia.monto,
        descripcion: "Transferencia Externa",
        saldo: transferencia.saldo,
      });
    else
      data.push({
        cuenta: transferencia.tipo_cuenta_origen,
        fecha: transferencia.created_at.slice(0, 10),
        fechaCompleta: transferencia.created_at,
        abono: transferencia.monto,
        descripcion: "Transferencia Externa",
        saldo: transferencia.saldo_destino,
      });
  });

  // Ordena los datos por fecha, para obtener un balance ordenado
  data.sort((a, b) => {
    const fechaA = new Date(a.fechaCompleta).getTime();
    const fechaB = new Date(b.fechaCompleta).getTime();

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

/**
 * Realiza las transferencia Internas a traves de al api y recarga la información
 * de las cuentas y balance para mantener el front actualizado.
 * @param {Object} datosTI
 * @param {number} monto
 * @param {function} history
 * @returns los datos en el store de redux
 */
export const transferenciaInterna = (datosTI, monto, history) => {
  return async (dispatch) => {
    const config = JSON.parse(sessionStorage.getItem("config"));

    // Object con los datos para la realizar la transferencia con la api
    const datos = {
      cuenta_origen: datosTI.cuentaOrigen,
      cuenta_destino: datosTI.cuentaDestino,
      monto: monto,
    };
    // Petición post que realiza la transferencia interna y actualiza las
    // cuentas y balance, si se realiza bien la transferencia.
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

/**
 * Realiza las transferencia externas a traves de al api y recarga la información
 * de las cuentas y balance para mantener el front actualizado.
 * @param {Object} datosTransferencia
 * @param {Function} history
 * @returns
 */
export const transferenciaExterna = (datosTransferencia, history) => {
  return async (dispatch) => {
    const config = JSON.parse(sessionStorage.getItem("config"));

    // Object con los datos para la realizar la transferencia con la api
    const datos = {
      cuenta_origen: datosTransferencia.cuentaOrigen,
      cuenta_destino: datosTransferencia.cuentaDestino,
      monto: datosTransferencia.monto,
      banco: datosTransferencia.banco,
      tipo_origen: datosTransferencia.tipo_origen,
      tipo_destino: datosTransferencia.tipo_destino,
    };

    // Petición post que realiza la transferencia externa y actualiza las
    // cuentas y balance, si se realiza bien la transferencia.
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

/**
 * Guarda los datos de las transferencias en el store de redux
 * @param {Object} transferencias
 * @returns
 */
export const cargarTransferencias = (transferencias) => ({
  type: types.cargarTransferencias,
  payload: transferencias,
});
