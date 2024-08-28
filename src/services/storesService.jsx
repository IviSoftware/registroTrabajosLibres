// services.js

import { sucursales, departamentos } from "../utils/data";

// Servicio para obtener las sucursales
export const getSucursales = () => {
  return Promise.resolve(sucursales);
};

// Servicio para obtener los departamentos
export const getDepartamentos = () => {
  return Promise.resolve(departamentos);
};
