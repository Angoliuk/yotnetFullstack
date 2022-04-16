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
    // Object.assign(config.headers, config.data.getHeaders());
  }
  return config;
});

export default api;
