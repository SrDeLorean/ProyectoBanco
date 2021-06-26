import Swal from "sweetalert2";
import { types } from "../constants/types";
import { startLoading, finishLoading } from "./ui";
import { cargarCuentas, cargarCuentasBD } from "./cuentas";
import axios from "axios";
import { api } from "./../constants/api.js";
import { cargarUsuariosBD } from "./usuarios";
import { cargarTransferenciasBD } from "./transferencias";

/**
 * Inicia sesion del usuario, conectando el front con el backend.
 * a travez del metodo post con axios. Y se almacena el token del usuario
 * en el sessionStorage.
 *
 * Ademas, se almacena la información de usuario en el store de redux.
 */
export const startLoginEmailPassword = (rut, password) => {
  return async (dispatch) => {
    dispatch(startLoading());
    let user = {
      rut: rut,
      password: password,
    };
    // Petición post al servidor backend
    await axios
      .post(api.auth, user)
      .then(async (response) => {
        const data = response.data.data;

        dispatch(finishLoading());
        var config = {
          headers: {
            Authorization: "bearer " + data.token,
          },
        };

        // Almacena el token en el session storage del navegador.
        sessionStorage.setItem("token", JSON.stringify(data.token));
        sessionStorage.setItem("config", JSON.stringify(config));
        sessionStorage.setItem("user", JSON.stringify(data.user));
        sessionStorage.setItem("uid", JSON.stringify(data.user.id));

        if (data.user?.rol == "admin") {
          // carga la informacion de los usuarios del servidor
          await dispatch(cargarUsuariosBD());
        }
        if (data.user?.rol == "user") {
          // carga la informacion del usuario como cuentas y balance del servidor.
          await dispatch(cargarCuentasBD());
          await dispatch(cargarTransferenciasBD());
        }
        // guarda la información del usuario logeado en el Redux.
        dispatch(login(data.user.id, data.user.nombre, data.user.rol, false));
      })
      .catch((e) => {
        console.log(e);
        dispatch(finishLoading());
        Swal.fire("Error", e.message, "error");
      });
  };
};

/**
 * Registra a un usuario, conectando el front con el backend.
 * a travez del metodo post con axios.
 *
 * Ademas, se almacena la información de usuario creado en el store de redux.
 */
export const startRegisterWithEmailPasswordName = async (
  email,
  password,
  name,
  rut,
  cuentas,
  history
) => {
  return async (dispatch) => {
    dispatch(startLoading());
    // información requerida para el registro del usuario
    const datos = {
      email: email,
      password: password,
      nombre: name,
      rut: rut,
      rol: "user",
      cuenta_corriente: cuentas.saldoCuentaCorriente,
      cuenta_ahorro: cuentas.saldoCuentaAhorro,
      cuenta_credito: cuentas.saldoTarjetaCredito,
    };
    const config = JSON.parse(sessionStorage.getItem("config"));

    // Petición post para registrar al usuario
    await axios
      .post(api.route + "/usuarios", datos, config)
      .then((resp) => {
        if (resp.data.status == 200) {
          // Actualiza los datos para tener el front actualizado
          dispatch(cargarUsuariosBD());

          Swal.fire("", resp.data.msg, "success").then(() => {
            history.push("/Clientes");
          });
        } else Swal.fire("", resp.data.msg, "error");

        dispatch(finishLoading());
      })
      .catch((err) => {
        dispatch(finishLoading());

        console.log(err);
      });
  };
};

/**
 *  Identifica al tipo de usario que esta logeado, para cargarle la información
 * necesario y almacenarla en el redux.
 *
 */
export const startCheking = () => {
  return (dispatch) => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (user?.rol == "admin") {
      // carga los usarios de la BD
      dispatch(cargarUsuariosBD());
    }
    if (user?.rol == "user") {
      // carga las cuentas de un usuario de la BD
      dispatch(cargarCuentasBD());
      // carga el balance y transferencias de las cuentas de los usuarios de la BD
      dispatch(cargarTransferenciasBD());
    }
    if (user?.id) {
      // Guarda en el store del redux el usario logeado.
      dispatch(login(user.id, user.nombre, user.rol, false));
    }
  };
};

/**
 * Guarda la informacion de un usuario en en el store de redux.
 * @param {*} uid id del usuario
 * @param {*} displayName nombre del usuario
 * @param {*} rol rol del usuario
 * @param {*} checking si esta logeado
 * @returns
 */
export const login = (uid, displayName, rol, checking) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
    rol,
    checking,
  },
});

/**
 * Cierra la sesión de un usuario tanto en el front como en el back.
 * @returns
 */
export const startLogout = () => {
  return async (dispatch) => {
    const config = JSON.parse(sessionStorage.getItem("config"));
    // petición post para el logout del usuario
    await axios
      .post(api.route + "/auth/logout", config)
      .then((resp) => console.log(resp))
      .catch((err) => {
        console.log(err);
      });
    // borra la informacion store del redux
    dispatch(logout());
    dispatch(cargarCuentas([]));
    dispatch(cargarUsuariosBD([]));
    // elimina el token del usuario de la session Storage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("config");
  };
};

/**
 * Realiza la tarea del logout en redux.
 */
export const logout = () => ({
  type: types.logout,
});
