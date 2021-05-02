const initialState = [
  {
    nombre: "",
    cuentas: [
      {
        tipo: "",
        saldo: 0,
        transaccion: [{ origen: "", destino: "", dinero: 0, tipo: "" }],
      },
    ],
    correo: "",
    contraseña: "",
    rut: "",
  },
];

export const usuarioReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
