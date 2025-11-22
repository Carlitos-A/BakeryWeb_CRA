import axiosClient from "./axios";

export const registrarUsuario = async (data) => {

  const response = await axiosClient.post(
    "/Usuarios/Registrar"
    , data,
    {
      headers: {
        "X-API-KEY": "123456789ABCDEF"
      }
    }
  );

  return response.data;
};