import axios from "axios";

const axiosBackend = axios.create({
  baseURL: "http://localhost:8084",
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": "123456789ABCDEF",
  },
});

export default axiosBackend;