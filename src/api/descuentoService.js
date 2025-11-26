import axiosDescuentos from "./axiosDescuentos";

export const obtenerDescuentosPorUsuario = async (idUsuario) => {
    const token = localStorage.getItem("token");
    const response = await axiosDescuentos.get(
        `/descuentos/usuario/${idUsuario}`,
        {
            headers: {
                "X-API-KEY": "123456789ABCDEF",
                "Authorization": `Bearer ${token}`
            }
        }
    );
    return response.data;
};

