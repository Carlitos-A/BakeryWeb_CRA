import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/Usuarios";

export const listarUsuarios = async () => {
  const response = await axios.get(API_URL);
  // La respuesta tiene "_embedded" si usas HATEOAS
  const data = response.data._embedded
    ? response.data._embedded.usuarioList
    : response.data;
  return data;
};

export const buscarUsuario = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const crearUsuario = async (usuario) => {
  const response = await axios.post(API_URL, usuario);
  return response.data;
};

export const actualizarUsuario = async (id, usuario) => {
  const response = await axios.put(`${API_URL}/${id}`, usuario);
  return response.data;
};
