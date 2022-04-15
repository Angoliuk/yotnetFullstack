import axios from "axios";
import { BASE_URL } from "../../Constants/config";

const apiAuth = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

apiAuth.interceptors.request((config) => {
  if (config.data instanceof FormData) {
    Object.assign(config.headers, config.data.getHeaders());
  }
  config.headers.Authorization = `Bearer ${
    JSON.parse(localStorage.getItem("UserData"))?.accessToken
  }`;
  return config;
});

export default apiAuth;
