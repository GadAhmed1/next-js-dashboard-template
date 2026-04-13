import axios from "axios";
// PATH: D:\Main\projects\next-js-dashboard-template\src\lib\axios.js

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.NEXT_PUBLIC_API_KEY
  }
});

axiosInstance.interceptors.request.use(
  (config) => {

    if (typeof window !== "undefined") {

      const token = localStorage.getItem("token");
      

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    console.error("[Axios Request Error]", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`[Axios Request] Sending to: ${config.url}`, config);
    return config;
  },
  (error) => {
    console.error("[Axios Request Error]", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;