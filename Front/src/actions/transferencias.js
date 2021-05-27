import axios from "axios";
import Swal from "sweetalert2";
import { api } from "../constants/api";
import { types } from "../constants/types";
import { cargarCuentasBD } from "./cuentas";

export const cargarTransferencias = () => {
  return async (dispatch) => {
    const config = JSON.parse(sessionStorage.getItem("config"));

    await axios
      .get(api.route + "/transferencias/internas", config)
      .then((resp) => {
        //console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const transferenciaInterna = (datosTI, monto, history) => {
  return async (dispatch) => {
    //console.log(id, datos);
    const config = JSON.parse(sessionStorage.getItem("config"));
    const datos = {
      cuenta_origen: datosTI.cuentaOrigen,
      cuenta_destino: datosTI.cuentaDestino,
      monto: monto,
    };

    console.log(datos);

    await axios
      .post(api.route + "/transferencias/internas", datos, config)
      .then((resp) => {
        if (resp.data.status == 200)
          Swal.fire("", resp.data.msg, "success").then(() => {
            dispatch(cargarCuentasBD());
            history.push("/TransferenciaInterna");
          });
        else Swal.fire("", resp.data.msg, "error");
      })
      .catch((e) => {
        console.log(e);
      });
  };
};
