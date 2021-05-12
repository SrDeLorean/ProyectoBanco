import { types } from "../constants/types";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      return {
        uid: action.payload.uid,
        name: action.payload.displayName,
        rol: action.payload.rol,
        checking: action.payload.checking,
      };

    case types.logout:
      return { checking: false };

    default:
      return state;
  }
};
