import Swal from "sweetalert2";

import { firebase, db } from "../api/firebase-config";
import { types } from "../constants/types";
import { startLoading, finishLoading } from "./ui";

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));

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
  datos
) => {
  return (dispatch) => {
    dispatch(startLoading());
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });
        console.log(user);

        await db
          .collection("Usuarios")
          .doc(user.uid)
          .set(datos)
          .then()
          .catch((e) => {
            console.log(e);
            dispatch(finishLoading());

            Swal.fire("Error", e.message, "error");
          });

        await firebase.auth().signOut();

        await firebase
          .auth()
          .signInWithEmailAndPassword("ian@gmail.com", "123456");

        //dispatch(login(user.uid, user.displayName));
      })
      .catch((e) => {
        console.log(e);

        Swal.fire("Error", e.message, "error");
      });
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
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
