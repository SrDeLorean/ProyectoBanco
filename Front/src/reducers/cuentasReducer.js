import { types } from "../constants/types";

export const cuentasReducer = (state = [], action) => {
  switch (action.type) {
    case types.cargarCuentas:
      return {
        ...state,
        cuentas: [...action.payload],
      };

    default:
      return state;
  }
};
