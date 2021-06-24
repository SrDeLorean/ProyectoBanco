import axios from "axios";
import { api } from "../constants/api";
import { types } from "../constants/types";

export const cargarCuentasBD = () => {
  return async (dispatch, getState) => {
    const cuentas = [];
    const config = JSON.parse(sessionStorage.getItem("config"));
    await axios
      .get(api.route + "/cuentas", config)
      .then((resp) => {
        let cuentas = Object.fromEntries(
          Object.entries(resp.data.cuentas).filter((cuenta) => {
            return cuenta[1] != null;
          })
        );
        dispatch(cargarCuentas(cuentas));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const exportarBalance = () => {
  return async (dispatch) => {
    const config = JSON.parse(sessionStorage.getItem("config"));

    await axios
      .get(api.route + "/cuentas/balance/exportar", config)
      .then((resp) => {
        console.log(resp);
      });

    await axios.get(api.route + "/cuentas/balance", config).then((resp) => {
      console.log(resp);
    });
  };
};

export const cargarCuentas = (cuentas) => ({
  type: types.cargarCuentas,
  payload: cuentas,
});
