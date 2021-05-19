import Swal from "sweetalert2";
import { firebase, db } from "../api/firebase-config";
import { types } from "../constants/types";
import { startLoading, finishLoading } from "./ui";
import { cargarCuentasBD, crearCuenta } from "./cuentas";
import axios from "axios";
import { api } from "./../constants/api.js";
import { cargarUsuariosBD } from "./usuarios";

export const startLoginEmailPassword = (email, password) => {
  return async (dispatch) => {
    dispatch(startLoading());
    let user = {
      email: email,
      password: password,
    };
    await axios
      .post(api.auth, user)
      .then(async (response) => {
        const data = response.data.data;

        dispatch(finishLoading());
        var config = {
          headers: {
            Authorization: "Bearer " + data.token,
          },
        };

        sessionStorage.setItem("token", JSON.stringify(data.token));
        sessionStorage.setItem("config", JSON.stringify(config));
        sessionStorage.setItem("user", JSON.stringify(data.user));
        if (data.user?.rol == "admin") {
          await dispatch(cargarUsuariosBD());
          // dispatch(cargarCuentasBD());
        }
        if (data.user?.rol == "user") {
          await dispatch(cargarCuentasBD());
        }
        dispatch(login(data.user.id, data.user.nombre, data.user.rol, false));
      })
      .catch((e) => {
        console.log(e);
        dispatch(finishLoading());
        Swal.fire("Error", e.message, "error");
      });
  };
};

export const startRegisterWithEmailPasswordName = async (
  email,
  password,
  name,
  rut,
  cuentas,
) => {
  return async (dispatch) => {
    dispatch(startLoading());

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

    await axios
      .post(api.route + "/usuarios", datos)
      .then((resp) => {
        if (resp.data.status == 200) Swal.fire("", resp.data.msg, "success");
        else Swal.fire("", resp.data.msg, "error");
        dispatch(finishLoading());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const startCheking = () => {
  return (dispatch) => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (user?.rol == "admin") {
      dispatch(cargarUsuariosBD());
      // dispatch(cargarCuentasBD());
    }
    if (user?.rol == "user") {
      dispatch(cargarCuentasBD());
    }
    if (user?.id) {
      dispatch(login(user.id, user.nombre, user.rol, false));
    }
  };
};

export const login = (uid, displayName, rol, checking) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
    rol,
    checking,
  },
});

export const startLogout = () => {
  return async (dispatch) => {
    await axios
      .post(api.route + "/logout")
      .then((resp) => console.log(resp))
      .catch((err) => {
        console.log(err);
      });
    dispatch(logout());

    //window.location.reload();
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("config");
  };
};

export const logout = () => ({
  type: types.logout,
});
