import axiosProductos from "./axiosProductos";

const API_URL = "/Productos"; 
// ya no repetimos localhost porque axiosProductos ya tiene baseURL

// LISTAR TODOS LOS PRODUCTOS
export const listarProductos = async () => {
  const response = await axiosProductos.get(API_URL);

  return response.data._embedded
    ? response.data._embedded.productoList
    : response.data;
};

// BUSCAR UN PRODUCTO POR ID
export const buscarProducto = async (id) => {
  const response = await axiosProductos.get(`${API_URL}/${id}`);
  return response.data;
};

// CREAR UN NUEVO PRODUCTO
export const crearProducto = async (producto) => {
  const response = await axiosProductos.post(API_URL, producto);
  return response.data;
};

// ACTUALIZAR PRODUCTO POR ID
export const actualizarProducto = async (id, producto) => {
  const response = await axiosProductos.put(`${API_URL}/${id}`, producto);
  return response.data;
};

// ELIMINAR PRODUCTO POR ID
export const eliminarProducto = async (id) => {
  const response = await axiosProductos.delete(`${API_URL}/${id}`);
  return response.data;
};

// FILTRAR POR CATEGORIA
export const filtrarPorCategoria = async (categoria) => {
  const response = await axiosProductos.get(`${API_URL}/Categoria/${categoria}`);
  return response.data;
};
