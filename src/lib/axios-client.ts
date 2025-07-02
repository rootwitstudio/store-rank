import axios from "axios";
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://store-rank-api-1058001898765.asia-southeast1.run.app/api";
const ACCESS_TOKEN = 'store-rank-token';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const cookieToken = Cookies.get(ACCESS_TOKEN);
    if (cookieToken && cookieToken !== 'undefined') {
      const token = JSON.parse(cookieToken);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  }
  return config;
});

export default api; 