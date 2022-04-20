import axios from "axios";
import { API_URL } from "../../Constants/config";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,DELETE,PATCH",
  },
});
// .catch((e) => {
//     console.log(e);
//     if (e.response) {
//       console.log(e.response);
//       throw new Error(
//         e.response.data
//           ? e.response.data.message
//             ? e.response.data.message
//             : e.response.data.join(". ")
//           : e.response.status + ". " + e.response.statusText
//       );
//     } else if (e.request) {
//       throw new Error(
//         e.request.data
//           ? e.request.data.message
//             ? e.request.data.message
//             : e.request.data.join(". ")
//           : e.request.status + ". " + e.request.statusText
//       );
//     } else {
//       throw new Error(
//         e.status && e.statusText
//           ? e.status + ". " + e.statusText
//           : "Unknown error"
//       );
//     }
//   });;

api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    config.headers = { ...config.headers, contentType: "multipart/form-data" };

    // Object.assign(config.headers, config.data.getHeaders());
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (e) => {
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
);

export default api;

// const originalRequest = e.config;
// if (
//   e.response.status === "401" &&
//   originalRequest &&
//   !originalRequest._isRetry
// ) {
//   originalRequest._isRetry = true;
//   try {
//     const response = await axios.get("/refresh", {
//       baseURL: API_URL,
//       withCredentials: true,
//     });
//     localStorage.setItem("UserData", response);
//     return apiAuth.request(originalRequest);
//   } catch (e) {
//     throw e;
//   }
// }

// else if (e.request) {
//   throw new Error(
//     `${e.request.status}. ${
//       e.request.message
//         ? e.request.message
//         : "No information about this error"
//     }`
//   );
// }
