import axios from "axios";



const axiosClient = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": "123456789ABCDEF",
  },
});



export default axiosClient;
