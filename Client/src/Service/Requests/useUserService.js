import { useCallback, useState } from "react";
import { ApiUserService } from "../ApiRequests/ApiUserService";
import { useReduxUserService } from "../ReduxRequests/useReduxUserService";
import { UserUpdateSchema } from "../../Hooks/Validator/Schemas/Schemas";
import { useValidator } from "../../Hooks/Validator/useValidator";

export const useUserService = () => {
  const [userLoading, setUserLoading] = useState(false);
  const reduxUserService = useReduxUserService();
  const { validate } = useValidator();

  const login = useCallback(
    async (loginData) => {
      try {
        setUserLoading(true);
        const user = await ApiUserService.loginApi(loginData);
        reduxUserService.loginRedux(user.data);
      } catch (e) {
        throw e;
      } finally {
        setUserLoading(false);
      }
    },
    [reduxUserService]
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
        const user = await ApiUserService.registerApi(formData);
        reduxUserService.loginRedux(user.data);
      } catch (e) {
        throw e;
      } finally {
        setUserLoading(false);
      }
    },
    [reduxUserService]
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
        const updatedUser = await ApiUserService.updateUserApi(id, formData);
        reduxUserService.updateUserRedux({
          ...updatedUser.data,
          accessToken: token,
        });
        // reduxUserService.loginRedux(updatedUser);
      } catch (e) {
        throw e;
      } finally {
        setUserLoading(false);
      }
    },
    [reduxUserService]
  );

  const getUser = useCallback(async (id) => {
    try {
      setUserLoading(true);
      const user = await ApiUserService.getUserApi(id);
      return user.data;
    } catch (e) {
      throw e;
    } finally {
      setUserLoading(false);
    }
  }, []);

  const deleteUser = useCallback(
    async (id) => {
      try {
        setUserLoading(true);
        await ApiUserService.deleteUserApi(id);
        reduxUserService.deleteUserRedux(id);
        // reduxUserService.logoutRedux();
      } catch (e) {
        throw e;
      } finally {
        setUserLoading(false);
      }
    },
    [reduxUserService]
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
