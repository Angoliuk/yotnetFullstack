import apiAuth from "../../Hooks/Http/ApiAuthRequests";
import api from "../../Hooks/Http/ApiRequests";

export class ApiUserService {
  static loginApi = async (loginData) => {
    return await api.post("/auth/login", loginData);
  };

  static registerApi = async (registerData) => {
    return await api.post("/auth/register", registerData);
  };

  static logoutApi = async () => {
    return await api.post("/auth/logout");
  };

  static refreshApi = async () => {
    return await api.post("/auth/refresh");
  };

  static getUserApi = async (id) => {
    return await api.get(`/users/${id}`);
  };

  static updateUserApi = async (id, user) => {
    if (user.password === "") delete user.password;

    return await apiAuth.patch(`users/${id}`, user);
  };

  static deleteUserApi = async (id) => {
    return await apiAuth.delete(`users/${id}`);
  };
}
