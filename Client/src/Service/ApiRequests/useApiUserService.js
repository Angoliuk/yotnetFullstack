import { useHttp } from "../../Hooks/Http/useHttp";
import { useCallback } from "react";
import { useSelector } from "react-redux";

export const useApiUserService = () => {
  const { request } = useHttp();
  const token = useSelector((state) => state.userReducers.accessToken);

  const loginApi = useCallback(
    async (loginData) => {
      const user = await request("/auth/200/login", "POST", loginData);
      return user;
    },
    [request]
  );

  const registerApi = useCallback(
    async (registerData) => {
      const user = await request("/auth/200/register", "POST", registerData, {
        "content-type": "multipart/form-data",
      });
      return user;
    },
    [request]
  );

  const getUserApi = useCallback(
    async (id) => {
      const user = await request(`/users/200/${id}`, "GET");
      return user;
    },
    [request]
  );

  const updateUserApi = useCallback(
    async (id, user) => {
      if (user.password === "") delete user.password;

      const updatedUser = await request(`users/440/${id}`, "PATCH", user, {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      });

      return updatedUser;
    },
    [request, token]
  );

  const deleteUserApi = useCallback(
    async (id) => {
      await request(`users/440/${id}`, "DELETE", null, {
        Authorization: `Bearer ${token}`,
      });
    },
    [request, token]
  );

  return {
    registerApi,
    loginApi,
    getUserApi,
    updateUserApi,
    deleteUserApi,
  };
};
