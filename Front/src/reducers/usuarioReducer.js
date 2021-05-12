import { types } from "../constants/types";

const initialState = [
  // {
  //   nombre: "",
  //   cuentas: [
  //     {
  //       id: 0,
  //       tipo: "",
  //       saldo: 0,
  //       transaccion: [{ origen: "", destino: "", dinero: 0, tipo: "" }],
  //     },
  //   ],
  //   correo: "",
  //   contraseña: "",
  //   rut: "",
  //   rol: "",
  // },
];

export const usuarioReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.cargarUsuarios:
      return {
        ...state,
        usuarios: [...action.payload],
      };
    default:
      return state;
  }
};
