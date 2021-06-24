import Swal from "sweetalert2";
import { types } from "../constants/types";
import { startLoading, finishLoading } from "./ui";
import { cargarCuentas, cargarCuentasBD } from "./cuentas";
import axios from "axios";
import { api } from "./../constants/api.js";
import { cargarUsuariosBD } from "./usuarios";
import { cargarTransferenciasBD } from "./transferencias";

export const startLoginEmailPassword = (rut, password) => {
  return async (dispatch) => {
    dispatch(startLoading());
    let user = {
      rut: rut,
      password: password,
    };
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

        sessionStorage.setItem("token", JSON.stringify(data.token));
        sessionStorage.setItem("config", JSON.stringify(config));
        sessionStorage.setItem("user", JSON.stringify(data.user));
        if (data.user?.rol == "admin") {
          await dispatch(cargarUsuariosBD());
          // dispatch(cargarCuentasBD());
        }
        if (data.user?.rol == "user") {
          await dispatch(cargarCuentasBD());
          await dispatch(cargarTransferenciasBD());
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
  history
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
    const config = JSON.parse(sessionStorage.getItem("config"));

    await axios
      .post(api.route + "/usuarios", datos, config)
      .then((resp) => {
        if (resp.data.status == 200) {
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

export const startCheking = () => {
  return (dispatch) => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (user?.rol == "admin") {
      dispatch(cargarUsuariosBD());
      // dispatch(cargarCuentasBD());
    }
    if (user?.rol == "user") {
      dispatch(cargarCuentasBD());
      dispatch(cargarTransferenciasBD());
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
    const config = JSON.parse(sessionStorage.getItem("config"));
    await axios
      .post(api.route + "/auth/logout", config)
      .then((resp) => console.log(resp))
      .catch((err) => {
        console.log(err);
      });
    dispatch(logout());
    dispatch(cargarCuentas([]));
    dispatch(cargarUsuariosBD([]));

    //window.location.reload();
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("config");
  };
};

export const logout = () => ({
  type: types.logout,
});
