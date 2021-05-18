import axios from "axios";
import { firebase, db } from "../api/firebase-config";
import { api } from "../constants/api";
import { types } from "../constants/types";
import { finishLoading, startLoading } from "./ui";

export const cargarCuentasBD = () => {
  return async (dispatch, getState) => {
    const cuentas = [];

    await axios
      .get(api.route + "/transferencias/internas")
      .then((resp) => {
        //console.log(resp);
      })
      .catch((e) => {
        // console.log(e);
      });
    /*db.collection("Cuentas")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          cuentas.push({
            ...doc.data(),
          });
          // doc.data() is never undefined for query doc snapshots
        });

        dispatch(cargarCuentas(cuentas));
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });*/
  };
};

export const crearCuenta = (uidUsuario, cuentas) => {
  return async (dispatch, getState) => {
    const {
      saldoCuentaCorriente,
      saldoTarjetaCredito,
      saldoCuentaAhorro,
      check,
    } = cuentas;

    let numeroCorriente = 0;
    let numeroCredito = 0;
    let numeroAhorro = 0;

    await db
      .collection("numeroTarjetas")
      .doc("numeros")
      .get()
      .then((doc) => {
        numeroAhorro = doc.data().ahorro.toString();
        numeroCorriente = doc.data().corriente.toString();
        numeroCredito = doc.data().credito.toString();
      });

    if (check.checkAhorro) {
      await actualizarNumeroCuentaUsuario(uidUsuario, {
        "cuentas.ahorro": numeroAhorro,
      });
      await actualizaNumeroTarjeta({
        ahorro: firebase.firestore.FieldValue.increment(1),
      });
      await crearCuentaIndividual(
        uidUsuario,
        numeroAhorro,
        "ahorro",
        saldoCuentaAhorro,
      );
    }

    if (check.checkCorriente) {
      await actualizarNumeroCuentaUsuario(uidUsuario, {
        "cuentas.corriente": numeroCorriente,
      });
      await actualizaNumeroTarjeta({
        corriente: firebase.firestore.FieldValue.increment(1),
      });
      await crearCuentaIndividual(
        uidUsuario,
        numeroCorriente,
        "corriente",
        saldoCuentaCorriente,
      );
    }

    if (check.checkCredito) {
      await actualizarNumeroCuentaUsuario(uidUsuario, {
        "cuentas.credito": numeroCredito,
      });
      await actualizaNumeroTarjeta({
        credito: firebase.firestore.FieldValue.increment(1),
      });

      await crearCuentaIndividual(
        uidUsuario,
        numeroCredito,
        "credito",
        saldoTarjetaCredito,
      );
    }
  };
};

const actualizarNumeroCuentaUsuario = async (uidUsuario, actualizacion) => {
  await db
    .collection("Usuarios")
    .doc(uidUsuario)
    .update(actualizacion)
    .then(() => {
      console.log("Document successfully updated!");
    });
};

const actualizaNumeroTarjeta = async (actualizacion) => {
  await db
    .collection("numeroTarjetas")
    .doc("numeros")
    .update(actualizacion)
    .then(() => {
      console.log("Document successfully updated!");
    });
};

const crearCuentaIndividual = async (
  uidUsuario,
  numeroCuenta,
  tipoCuenta,
  saldo,
) => {
  let cuenta = {
    tipo: tipoCuenta,
    saldo: saldo,
    dueño: uidUsuario,
    transferencias: [],
    activa: true,
  };

  await db
    .collection("Cuentas")
    .doc(numeroCuenta)
    .set(cuenta)
    .then(() => {
      console.log("Document successfully updated!");
    })
    .catch((e) => {
      console.log("Document error " + e.message);
    });
};

const actualizarCuenta = async (numeroCuenta, actualizacion) => {
  await db
    .collection("Cuentas")
    .doc(numeroCuenta)
    .update(actualizacion)
    .then(() => {
      console.log("Document successfully updated!");
    });
};

export const editarCuenta = (uidUsuario, cuentas, numerosCuenta) => {
  return async (dispatch, getState) => {
    dispatch(startLoading());
    const {
      saldoCuentaCorriente,
      saldoTarjetaCredito,
      saldoCuentaAhorro,
      checkAhorro,
      checkCorriente,
      checkCredito,
    } = cuentas;

    let numeroCorriente = 0;
    let numeroCredito = 0;
    let numeroAhorro = 0;

    await db
      .collection("numeroTarjetas")
      .doc("numeros")
      .get()
      .then((doc) => {
        numeroAhorro = doc.data().ahorro.toString();
        numeroCorriente = doc.data().corriente.toString();
        numeroCredito = doc.data().credito.toString();
      });

    if (checkAhorro) {
      if (numerosCuenta.ahorro == 0) {
        await actualizarNumeroCuentaUsuario(uidUsuario, {
          "cuentas.ahorro": numeroAhorro,
        });
        await actualizaNumeroTarjeta({
          ahorro: firebase.firestore.FieldValue.increment(1),
        });
        await crearCuentaIndividual(
          uidUsuario,
          numeroAhorro,
          "ahorro",
          saldoCuentaAhorro,
        );
      } else {
        await actualizarCuenta(numerosCuenta.ahorro, {
          activa: checkAhorro,
          saldo: saldoCuentaAhorro,
        });
      }
    } else if (numerosCuenta.ahorro != 0) {
      await actualizarCuenta(numerosCuenta.ahorro, {
        activa: checkAhorro,
        saldo: saldoCuentaAhorro,
      });
    }

    if (checkCorriente) {
      if (numerosCuenta.corriente == 0) {
        await actualizarNumeroCuentaUsuario(uidUsuario, {
          "cuentas.corriente": numeroCorriente,
        });
        await actualizaNumeroTarjeta({
          corriente: firebase.firestore.FieldValue.increment(1),
        });
        await crearCuentaIndividual(
          uidUsuario,
          numeroCorriente,
          "corriente",
          saldoCuentaCorriente,
        );
      } else {
        await actualizarCuenta(numerosCuenta.corriente, {
          activa: checkCorriente,
          saldo: saldoCuentaCorriente,
        });
      }
    } else if (numerosCuenta.corriente != 0) {
      await actualizarCuenta(numerosCuenta.corriente, {
        activa: checkCorriente,
        saldo: saldoCuentaCorriente,
      });
    }

    if (checkCredito) {
      if (numerosCuenta.credito == 0) {
        await actualizarNumeroCuentaUsuario(uidUsuario, {
          "cuentas.credito": numeroCredito,
        });
        await actualizaNumeroTarjeta({
          credito: firebase.firestore.FieldValue.increment(1),
        });

        await crearCuentaIndividual(
          uidUsuario,
          numeroCredito,
          "credito",
          saldoTarjetaCredito,
        );
      } else {
        await actualizarCuenta(numerosCuenta.credito, {
          activa: checkCredito,
          saldo: saldoTarjetaCredito,
        });
      }
    } else if (numerosCuenta.credito != 0) {
      await actualizarCuenta(numerosCuenta.credito, {
        activa: checkCredito,
        saldo: saldoTarjetaCredito,
      });
    }

    dispatch(editarCuentas());
    dispatch(finishLoading());
  };
};

export const editarCuentas = () => ({
  type: types.editarCuentas,
});

export const cargarCuentas = (cuentas) => ({
  type: types.cargarCuentas,
  payload: cuentas,
});
