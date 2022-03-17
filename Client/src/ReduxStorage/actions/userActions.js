import { LOGIN, LOGOUT } from "./actionsTypes";

export const autoLogin = () => {
  const userInfo = JSON.parse(localStorage.getItem("userData"));
  if (!!userInfo?.accessToken) {
    return {
      type: LOGIN,
      payload: userInfo,
    };
  } else {
    return {
      type: LOGOUT,
    };
  }
};

export const login = (userInfo) => {
  localStorage.setItem("userData", JSON.stringify(userInfo));
  return {
    type: LOGIN,
    payload: userInfo,
  };
};

export const logout = () => {
  localStorage.removeItem("userData");
  return {
    type: LOGOUT,
  };
};
