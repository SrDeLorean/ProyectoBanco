import Swal from "sweetalert2";
import { firebase, db } from "../api/firebase-config";
import { types } from "../constants/types";
import { startLoading, finishLoading } from "./ui";
import { crearCuenta } from "./cuentas";
import axios from "axios";
import { api } from "./../constants/api.js";

export const startLoginEmailPassword = (email, password) => {
  return async (dispatch) => {
    dispatch(startLoading());
    let user = {
      email: email,
      password: password,
    };
    await axios
      .post(api.auth, user)
      .then((response) => {
        console.log(response.data.data);
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
  datos,
  cuentas,
) => {
  return (dispatch) => {
    dispatch(startLoading());

    const datos = {
      email:email,
      password:password,
      nombre:name,
      rol: "user",
    }
    axios.post(api.route + "/usuarios", datos)
      .then(resp => {
        console.log(resp)
        dispatch(finishLoading());
      })
      .catch(err => {
          console.log(err)
      });
  };
};

export const startCheking = () => {
  return (dispatch) => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (user?.rol) {
      //dispatch(cargarUsuariosBD());
      // dispatch(cargarCuentasBD());
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
    dispatch(logout());

    window.location.reload();
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("config");
  };
};

export const logout = () => ({
  type: types.logout,
});
