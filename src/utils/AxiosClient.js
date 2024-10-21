import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 200,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default AxiosInstance;
