import axios from "axios";
import { api } from "../constants/api";
import { types } from "../constants/types";

/**
 * Carga las cuentas de un usuario logeado, como cuenta corriente, credito y ahorro.
 */
export const cargarCuentasBD = () => {
  return async (dispatch, getState) => {
    const cuentas = [];
    const config = JSON.parse(sessionStorage.getItem("config"));
    // peticion get para obtener los datos de las cuentas.
    await axios
      .get(api.route + "/cuentas", config)
      .then((resp) => {
        // se convierte los datos entregados por el servidor para convertilos en object en JavaScript
        let cuentas = Object.fromEntries(
          Object.entries(resp.data.cuentas).filter((cuenta) => {
            return cuenta[1] != null;
          })
        );
        // guarda las cuentas en store de redux
        dispatch(cargarCuentas(cuentas));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};
/**
 * Agrega la informacion de las cuentas en redux
 * @param {Object} cuentas
 * @returns
 */
export const cargarCuentas = (cuentas) => ({
  type: types.cargarCuentas,
  payload: cuentas,
});
