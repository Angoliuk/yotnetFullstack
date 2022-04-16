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
// .catch((e) => {
//   console.log(e);
//   if (e.response) {
//     console.log(e.response);
//     throw new Error(
//       `${e.response.status}. ${
//         e.response.message
//           ? e.response.message
//           : "No information about this error"
//       }`
//     );
//   } else if (e.request) {
//     throw new Error(
//       `${e.request.status}. ${
//         e.request.message
//           ? e.request.message
//           : "No information about this error"
//       }`
//     );
//   } else {
//     throw new Error(e.status ? e.status : "Unknown error");
//   }
// });

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
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === "401" &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get("/refresh", {
          baseURL: API_URL,
          withCredentials: true,
        });
        localStorage.setItem("UserData", response);
        return apiAuth.request(originalRequest);
      } catch (e) {
        throw e;
      }
    }
    console.log(error);
    throw error;
  }
);

export default apiAuth;