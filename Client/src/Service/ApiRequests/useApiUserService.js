import { useHttp } from "../../Hooks/Http/useHttp";
import { useCallback } from "react";
import { useSelector } from "react-redux";

export const useApiUserService = () => {
  const { request } = useHttp();
  const token = useSelector((state) => state.userReducers.accessToken);

  const loginApi = useCallback(
    async (loginData) => {
      const user = await request("/login", "POST", loginData);
      return user;
    },
    [request]
  );

  const registerApi = useCallback(
    async (registerData) => {
      const user = await request("/register", "POST", registerData);
      return user;
    },
    [request]
  );

  const getUserApi = useCallback(
    async (_id) => {
      const user = await request(`/200/user/${_id}`, "GET");
      return user;
    },
    [request]
  );

  const updateUserApi = useCallback(
    async (_id, user) => {
      if (user.password === "") delete user.password;

      const updatedUser = await request(`/440/users/${_id}`, "PATCH", user, {
        Authorization: `Bearer ${token}`,
      });

      return updatedUser;
    },
    [request, token]
  );

  return {
    registerApi,
    loginApi,
    getUserApi,
    updateUserApi,
  };
};
