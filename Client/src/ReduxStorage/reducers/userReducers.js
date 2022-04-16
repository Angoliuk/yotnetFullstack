import { LOGIN, LOGOUT } from "../actions/actionsTypes";

const initialState = {
  email: null,
  firstname: null,
  lastname: null,
  age: null,
  accessToken: null,
  id: null,
  avatar: null,
};

export const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return {
        email: null,
        firstName: null,
        lastName: null,
        age: null,
        accessToken: null,
        id: null,
        avatar: null,
      };

    case LOGIN:
      return {
        email: action.payload.email,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        age: action.payload.age,
        accessToken: action.payload.accessToken,
        id: action.payload.id,
        avatar: action.payload.avatar,
      };

    default:
      return state;
  }
};
