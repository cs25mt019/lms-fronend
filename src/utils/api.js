// src/utils/api.js
import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/";

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

// Attach access token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Session expired. Redirecting...");
      localStorage.clear();
      window.location.href = "/user-login";
    }
    return Promise.reject(error);
  }
);


export default api;