import axios from "axios";
import { firebase, db } from "../api/firebase-config";
import { api } from "../constants/api";
import { types } from "../constants/types";

export const cargarUsuariosBD = () => {
  return async (dispatch, getState) => {
    ///dispatch(startLoading());
    const userIDAdmin = getState().auth.uid;
    const usuarios = [];

    await axios
      .get(api.route + "/usuarios")
      .then((resp) => {
        //console.log(resp.data);
        dispatch(cargarUsuarios(resp.data));
      })
      .catch((err) => {
        console.log(err);
      });

    /*db.collection("Usuarios")
      .where("rol", "!=", "admin")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          usuarios.push({
            Id: doc.id,
            ...doc.data(),
          });
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.id, " => ", doc.data());
        });

        dispatch(cargarUsuarios(usuarios));
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });*/
  };
};

export const cargarUsuarios = (usuarios) => ({
  type: types.cargarUsuarios,
  payload: usuarios,
});
