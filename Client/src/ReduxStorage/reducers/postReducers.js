import {
  ADD_COMMENTS,
  ADD_POSTS,
  ADD_TO_END_POSTS,
  UPDATE_COMMENTS,
  UPDATE_POSTS,
} from "../actions/actionsTypes";

const initialState = {
  posts: [],
  comments: [],
};

export const postReducers = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_POSTS:
      return {
        ...state,
        posts: action.payload,
      };

    case UPDATE_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };

    case ADD_COMMENTS:
      return {
        ...state,
        comments: [...action.payload, ...state.comments],
      };

    case ADD_POSTS:
      return {
        ...state,
        posts: [...action.payload, ...state.posts],
      };

    case ADD_TO_END_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
      };

    default:
      return state;
  }
};
