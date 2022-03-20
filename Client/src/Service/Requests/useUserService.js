import { useCallback, useState } from "react";
import { useApiUserService } from "../ApiRequests/useApiUserService";
import { useReduxUserService } from "../ReduxRequests/useReduxUserService";
import {
  UserRegisterSchema,
  UserUpdateSchema,
} from "../../Hooks/Validator/Schemas/Schemas";
import { useValidator } from "../../Hooks/Validator/useValidator";

export const useUserService = () => {
  const [userLoading, setUserLoading] = useState(false);
  const apiUserService = useApiUserService();
  const reduxUserService = useReduxUserService();
  const { validate } = useValidator();

  const login = useCallback(
    async (loginData) => {
      try {
        setUserLoading(true);
        const user = await apiUserService.loginApi(loginData);
        reduxUserService.loginRedux(user);
      } catch (e) {
        throw e;
      } finally {
        setUserLoading(false);
      }
    },
    [apiUserService, reduxUserService]
  );

  const register = useCallback(
    async (registerData) => {
      try {
        setUserLoading(true);
        const user = await apiUserService.registerApi(registerData);
        reduxUserService.loginRedux(user);
      } catch (e) {
        throw e;
      } finally {
        setUserLoading(false);
      }
    },
    [apiUserService, reduxUserService]
  );

  const updateUser = useCallback(
    async (_id, user, token) => {
      try {
        setUserLoading(true);
        await validate(user, UserUpdateSchema);
        const updatedUser = await apiUserService.updateUserApi(_id, user);
        reduxUserService.updateUserRedux({
          ...updatedUser,
          accessToken: token,
        });
        // reduxUserService.loginRedux(updatedUser);
      } catch (e) {
        throw e;
      } finally {
        setUserLoading(false);
      }
    },
    [apiUserService, reduxUserService]
  );

  const getUser = useCallback(
    async (_id) => {
      try {
        setUserLoading(true);
        const user = await apiUserService.getUserApi(_id);
        return user;
      } catch (e) {
        throw e;
      } finally {
        setUserLoading(false);
      }
    },
    [apiUserService]
  );

  return {
    register,
    login,
    updateUser,
    userLoading,
    getUser,
  };
};
