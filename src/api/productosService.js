import axiosProductos from "./axiosProductos";

export const obtenerProductos = async () => {
  const response = await axiosProductos.get("/api/v1/Productos");
  return response.data;
};
