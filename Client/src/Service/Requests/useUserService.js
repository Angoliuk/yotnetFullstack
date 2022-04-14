import { useCallback, useState } from "react";
import { useApiUserService } from "../ApiRequests/useApiUserService";
import { useReduxUserService } from "../ReduxRequests/useReduxUserService";
import { UserUpdateSchema } from "../../Hooks/Validator/Schemas/Schemas";
import { useValidator } from "../../Hooks/Validator/useValidator";
import { useDispatch } from "react-redux";

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
        const formData = new FormData();
        for (const key in registerData) {
          if (key !== "photos") {
            formData.append(key, registerData[key]);
          } else {
            for (let i = 0; i < registerData.photos.length; i++) {
              formData.append("photos", registerData.photos[i]);
            }
          }
        }
        const user = await apiUserService.registerApi(formData);
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
    async (id, user, token) => {
      try {
        setUserLoading(true);
        await validate(user, UserUpdateSchema);
        const formData = new FormData();
        for (const key in user) {
          if (key !== "photos") {
            formData.append(key, user[key]);
          } else {
            for (let i = 0; i < user.photos.length; i++) {
              formData.append("photos", user.photos[i]);
            }
          }
        }
        const updatedUser = await apiUserService.updateUserApi(id, formData);
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
    async (id) => {
      try {
        setUserLoading(true);
        const user = await apiUserService.getUserApi(id);
        return user;
      } catch (e) {
        throw e;
      } finally {
        setUserLoading(false);
      }
    },
    [apiUserService]
  );

  const deleteUser = useCallback(
    async (id) => {
      try {
        setUserLoading(true);
        await apiUserService.deleteUserApi(id);
        reduxUserService.deleteUserRedux(id);
        // reduxUserService.logoutRedux();
      } catch (e) {
        throw e;
      } finally {
        setUserLoading(false);
      }
    },
    [apiUserService, reduxUserService]
  );

  return {
    register,
    login,
    updateUser,
    deleteUser,
    userLoading,
    getUser,
  };
};
