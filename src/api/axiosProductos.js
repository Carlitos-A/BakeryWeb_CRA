import axios from "axios";

const axiosProductos = axios.create({
  baseURL: "http://localhost:8084", 
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": "123456789ABCDEF",
  },
});

export default axiosProductos;
