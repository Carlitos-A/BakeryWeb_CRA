import axiosClient from "./axios";

const API_URL = "/Usuarios";

// LISTAR TODOS LOS USUARIOS
export const listarUsuarios = async () => {
  const response = await axiosClient.get(API_URL);

  const data = response.data._embedded
    ? response.data._embedded.usuarioList
    : response.data;

  return data;
};

// BUSCAR USUARIO POR ID
export const buscarUsuario = async (id) => {
  const response = await axiosClient.get(`${API_URL}/${id}`);
  return response.data;
};

// REGISTRAR USUARIO
export const registrarUsuario = async (usuario) => {
  const response = await axiosClient.post(`${API_URL}/Registrar`, usuario);
  return response.data;
};

// ACTUALIZAR USUARIO
export const actualizarUsuario = async (id, usuario) => {
  const response = await axiosClient.put(`${API_URL}/${id}`, usuario);
  return response.data;
};

// ELIMINAR USUARIO
export const eliminarUsuario = async (id) => {
  const response = await axiosClient.delete(`${API_URL}/${id}`);
  return response.data;
};

// BUSCAR USUARIO POR UID FIREBASE
export const buscarUsuarioUID = async (uid) => {
  const response = await axiosClient.get(`${API_URL}/uid/${uid}`);
  return response.data;
};
export const editarUsuarioAdmin = async (id, datos) => {
  const response = await axiosClient.patch(`${API_URL}/${id}`, datos);
  return response.data;
};