import {
  ADD_ANNOUNCEMENTS,
  ADD_TO_END_ANNOUNCEMENTS,
  UPDATE_ANNOUNCEMENTS,
} from "../actions/actionsTypes";

const initialState = {
  announcements: [],
};

export const announcementReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ANNOUNCEMENTS:
      return {
        ...state,
        announcements: [...action.payload, ...state.announcements],
      };

    case UPDATE_ANNOUNCEMENTS:
      return {
        ...state,
        announcements: action.payload,
      };

    case ADD_TO_END_ANNOUNCEMENTS:
      return {
        ...state,
        announcements: [...state.announcements, ...action.payload],
      };

    default:
      return state;
  }
};
