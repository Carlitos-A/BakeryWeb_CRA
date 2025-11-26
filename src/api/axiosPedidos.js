import axios from "axios";

export const axiosPedido = axios.create({
    baseURL: "http://localhost:8085/pedidos",
    headers: { "Content-Type": "application/json" },
    "X-API-KEY": "123456789ABCDEF",
});

export default axiosPedido;