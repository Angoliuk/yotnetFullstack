import apiAuth from "../../Hooks/Http/ApiAuthRequests";
import api from "../../Hooks/Http/ApiRequests";

export class ApiUserService {
  static loginApi = async (loginData) => {
    const user = await api.post("/auth/200/login", loginData);
    return user;
  };

  static registerApi = async (registerData) => {
    const user = await api.post("/auth/200/register", registerData);
    return user;
  };

  static getUserApi = async (id) => {
    const user = await api.get(`/users/200/${id}`);
    return user;
  };

  static updateUserApi = async (id, user) => {
    if (user.password === "") delete user.password;

    const updatedUser = await apiAuth.patch(`users/440/${id}`, user);

    return updatedUser;
  };

  static deleteUserApi = async (id) => {
    await apiAuth.delete(`users/440/${id}`);
  };
}
