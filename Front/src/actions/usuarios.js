import { firebase, db } from "../api/firebase-config";
import { types } from "../constants/types";

export const cargarUsuariosBD = () => {
  return async (dispatch, getState) => {
    ///dispatch(startLoading());
    const userIDAdmin = getState().auth.uid;
    const usuarios = [];
    db.collection("Usuarios")
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
      });
  };
};

export const cargarUsuarios = (usuarios) => ({
  type: types.cargarUsuarios,
  payload: usuarios,
});
