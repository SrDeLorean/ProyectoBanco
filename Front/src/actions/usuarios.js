import axios from "axios";
import Swal from "sweetalert2";
import { api } from "../constants/api";
import { types } from "../constants/types";

/**
 * Carga los usuario de la base de datos a traves de la api y almacena
 * en el store de redux la información.
 */
export const cargarUsuariosBD = () => {
  return async (dispatch, getState) => {
    const userIDAdmin = getState().auth.uid;
    const usuarios = [];
    const config = JSON.parse(sessionStorage.getItem("config"));

    // Petición get para obtener los usuarips de la api
    await axios
      .get(api.route + "/usuarios", config)
      .then((resp) => {
        // Guarda la respuesta de la api en el store de redux
        dispatch(cargarUsuarios(resp.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

/**
 * Envia una peticion put para editar la información del usuario y
 * recarga los datos de los usuarios para mantener el front actualizado.
 * @param {String} id
 * @param {Array} datos
 */
export const editarUsuario = (id, datos) => {
  return async (dispatch) => {
    const config = JSON.parse(sessionStorage.getItem("config"));
    // Petición put para editar al usuario
    await axios
      .put(api.route + "/usuarios/" + id, datos, config)
      .then((resp) => {
        if (resp.data.status == 200) {
          Swal.fire("", resp.data.msg, "success");
          // Recarga la informacion de los usuarios
          dispatch(cargarUsuariosBD());
        } else Swal.fire("", resp.data.msg, "error");
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

/**
 * Elimina un usuario de la base de datos a traves de la api.
 * @param {String} id
 * @param {Function} history
 * @returns
 */
export const deleteUser = (id, history) => {
  return async (dispatch) => {
    const config = JSON.parse(sessionStorage.getItem("config"));
    // Petición delete hacia la api, que borra a un usuario
    await axios
      .delete(api.route + "/usuarios/" + id, config)
      .then((resp) => {
        if (resp.data.status == 200) {
          // Recarga la informacion de los usuarios y almacena en Redux
          dispatch(cargarUsuariosBD());

          Swal.fire("", resp.data.msg, "success").then(() => {
            // redirige hacia la pagina clientes si todo salio bien
            history.push("/Clientes");
          });
        } else Swal.fire("", resp.data.msg, "error");
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

/**
 * Almacena la información de los usuarios en el store de redux
 * @param {Array} usuarios
 * @returns Object para redux
 */
export const cargarUsuarios = (usuarios) => ({
  type: types.cargarUsuarios,
  payload: usuarios,
});
