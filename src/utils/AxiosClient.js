import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8080",
    timeout: parseInt(process.env.REACT_APP_API_TIMEOUT) || 6000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export default AxiosInstance;
