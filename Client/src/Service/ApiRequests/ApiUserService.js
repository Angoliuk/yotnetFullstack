import apiAuth from "../../Hooks/Http/ApiAuthRequests";
import api from "../../Hooks/Http/ApiRequests";

export class ApiUserService {
  static loginApi = async (loginData) => {
    return await api.post("/auth/200/login", loginData);
  };

  static registerApi = async (registerData) => {
    return await api.post("/auth/200/register", registerData);
  };

  static getUserApi = async (id) => {
    return await api.get(`/users/200/${id}`);
  };

  static updateUserApi = async (id, user) => {
    if (user.password === "") delete user.password;

    return await apiAuth.patch(`users/440/${id}`, user);
  };

  static deleteUserApi = async (id) => {
    return await apiAuth.delete(`users/440/${id}`);
  };
}
