import { axiosPedido } from "./axiosPedidos";



export const crearPedido = async (pedido) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await axiosPedido.post("/crear", pedido, {
      headers: {
        "X-API-KEY": "123456789ABCDEF",
        "Authorization": `Bearer ${token}`
      }
    });
    return data;
  } catch (error) {
    console.error("Error al crear pedido:", error.response || error.message);
    throw error;
  }
};
