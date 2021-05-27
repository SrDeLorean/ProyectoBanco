import axios from "axios";
import Swal from "sweetalert2";
import { api } from "../constants/api";
import { types } from "../constants/types";

export const cargarUsuariosBD = () => {
  return async (dispatch, getState) => {
    ///dispatch(startLoading());
    const userIDAdmin = getState().auth.uid;
    const usuarios = [];
    const config = JSON.parse(sessionStorage.getItem("config"));

    await axios
      .get(api.route + "/usuarios", config)
      .then((resp) => {
        //console.log(resp.data);
        dispatch(cargarUsuarios(resp.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const editarUsuario = (id, datos) => {
  return async (dispatch) => {
    //console.log(id, datos);
    const config = JSON.parse(sessionStorage.getItem("config"));

    await axios
      .put(api.route + "/usuarios/" + id, datos, config)
      .then((resp) => {
        if (resp.data.status == 200) Swal.fire("", resp.data.msg, "success");
        else Swal.fire("", resp.data.msg, "error");
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const deleteUser = (id, history) => {
  return async (dispatch) => {
    const config = JSON.parse(sessionStorage.getItem("config"));

    await axios
      .delete(api.route + "/usuarios/" + id, config)
      .then((resp) => {
        //console.log(resp);
        if (resp.data.status == 200)
          Swal.fire("", resp.data.msg, "success").then(() => {
            history.push("/Clientes");
          });
        else Swal.fire("", resp.data.msg, "error");
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const cargarUsuarios = (usuarios) => ({
  type: types.cargarUsuarios,
  payload: usuarios,
});
