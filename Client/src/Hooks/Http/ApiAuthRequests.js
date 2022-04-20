import axios from "axios";
import { API_URL } from "../../Constants/config";

const apiAuth = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,DELETE,PATCH",
  },
});

apiAuth.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    config.headers = { ...config.headers, contentType: "multipart/form-data" };
  }
  config.headers.Authorization = `Bearer ${
    JSON.parse(localStorage.getItem("userData"))?.accessToken
  }`;
  return config;
});

apiAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  async (e) => {
    console.log(e);
    console.log(e.response.status);
    const originalRequest = e.config;
    if (
      e.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get("auth/refresh", {
          baseURL: API_URL,
          withCredentials: true,
        });
        localStorage.setItem("userData", JSON.stringify(response.data));

        return apiAuth.request(originalRequest);
      } catch (e) {
        throw e;
      }
    } else {
      if (e.response) {
        throw new Error(
          e.response?.data?.message
            ? `Error ${e.response.status}, ${e.response.statusText}. ${e.response.data.message}`
            : `Error ${e.response.status}, ${e.response.statusText}`
        );
      } else if (e.request) {
        throw new Error(
          e.request?.data?.message
            ? `Error ${e.request.status}, ${e.request.statusText}. ${e.request.data.message}`
            : `Error ${e.request.status}, ${e.request.statusText}`
        );
      } else {
        throw new Error(
          e.status ? `Error ${e.status}, ${e.statusText}` : "Unknown error"
        );
      }
    }
    // if (e.response) {
    //   throw new Error(
    //     e.response?.data?.message
    //       ? `${e.response.status}, ${e.response.statusText}. ${e.response.data.message}`
    //       : `${e.response.status}, ${e.response.statusText}`
    //   );
    // } else if (e.request) {
    //   throw new Error(
    //     e.request?.data?.message
    //       ? `${e.request.status}, ${e.request.statusText}. ${e.request.data.message}`
    //       : `${e.request.status}, ${e.request.statusText}`
    //   );
    // } else {
    //   throw new Error(
    //     e.status ? `${e.status}, ${e.statusText}` : "Unknown error"
    //   );
    // }
    // console.log(e);
    // throw error;
  }
);

export default apiAuth;
