import {
  ADD_ANNOUNCEMENTS,
  ADD_TO_END_ANNOUNCEMENTS,
  UPDATE_ANNOUNCEMENTS,
} from "./actionsTypes";

export const setAnnouncements = (announcements) => ({
  type: UPDATE_ANNOUNCEMENTS,
  payload: announcements,
});

export const addAnnouncements = (announcements) => ({
  type: ADD_ANNOUNCEMENTS,
  payload: announcements,
});

export const addToEndAnnouncements = (announcements) => ({
  type: ADD_TO_END_ANNOUNCEMENTS,
  payload: announcements,
});
