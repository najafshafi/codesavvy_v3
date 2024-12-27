import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3003/api", // Backend API base URL
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach Authorization header if token exists
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            // console.log("Token attached to request:", token);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
