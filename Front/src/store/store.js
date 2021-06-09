import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { authReducer } from "../reducers/authReducer";
import { cuentasReducer } from "../reducers/cuentasReducer";
import { uiReducer } from "../reducers/uiReducer";
import { usuarioReducer } from "../reducers/usuarioReducer";
import { transferenciasReducer } from "../reducers/transferenciasReducer";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducers = combineReducers({
  auth: authReducer,
  usuarios: usuarioReducer,
  ui: uiReducer,
  cuentas: cuentasReducer,
  transferencias: transferenciasReducer,
});

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk)),
);
