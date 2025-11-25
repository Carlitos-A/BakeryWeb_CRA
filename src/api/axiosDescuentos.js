import axios from "axios";

const axiosDescuentos = axios.create({
baseURL: "http://localhost:8089", 
headers: {
"Content-Type": "application/json",
"X-API-KEY": "123456789ABCDEF",
},
});

export default axiosDescuentos;
