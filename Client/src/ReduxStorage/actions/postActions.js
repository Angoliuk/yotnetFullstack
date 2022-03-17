import {
  ADD_COMMENTS,
  ADD_POSTS,
  ADD_TO_END_POSTS,
  UPDATE_COMMENTS,
  UPDATE_POSTS,
} from "./actionsTypes";

export const setPosts = (posts) => ({
  type: UPDATE_POSTS,
  payload: posts,
});

export const setComments = (comments) => ({
  type: UPDATE_COMMENTS,
  payload: comments,
});

export const addComments = (comments) => ({
  type: ADD_COMMENTS,
  payload: comments,
});

export const addPosts = (posts) => ({
  type: ADD_POSTS,
  payload: posts,
});

export const addToEndPosts = (posts) => ({
  type: ADD_TO_END_POSTS,
  payload: posts,
});
