import Swal from "sweetalert2";

import { firebase, db } from "../api/firebase-config";
import { types } from "../constants/types";
import { startLoading, finishLoading } from "./ui";
import { crearCuenta } from "./cuentas";

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(login(user.uid, user.displayName, user.phoneNumber));

        dispatch(finishLoading());
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
  cuentas
) => {
  return (dispatch) => {
    dispatch(startLoading());
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });
        console.log(user);
        const uidUsuario = user.uid;

        await firebase.auth().signOut();

        await firebase
          .auth()
          .signInWithEmailAndPassword("admin@gmail.com", "123456");

        await db
          .collection("Usuarios")
          .doc(uidUsuario)
          .set(datos)
          .then(async () => {
            dispatch(finishLoading());
          })
          .catch((e) => {
            Swal.fire("Error usuario", e.message, "error");
          });

        await dispatch(crearCuenta(uidUsuario, cuentas));
      })
      .catch((e) => {
        Swal.fire("Error create", e.message, "error");
      });
  };
};

export const login = (uid, displayName, rol) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
    rol,
  },
});

export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();

    dispatch(logout());
  };
};

export const logout = () => ({
  type: types.logout,
});
