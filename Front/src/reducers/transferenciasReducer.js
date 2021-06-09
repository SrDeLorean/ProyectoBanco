import { types } from "../constants/types";

export const transferenciasReducer = (state = [], action) => {
  switch (action.type) {
    case types.cargarTransferencias:
      return {
        ...state,
        transferencias: action.payload,
      };

    default:
      return state;
  }
};
