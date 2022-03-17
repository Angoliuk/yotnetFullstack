import { useDispatch, useSelector } from "react-redux";
import {
  addPosts,
  addToEndPosts,
  setPosts,
} from "../../ReduxStorage/actions/postActions";
import { useCallback } from "react";

export const useReduxPostService = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducers.posts);
  const user = useSelector((state) => state.userReducers);

  const setPostsRedux = useCallback(
    (postsFromDB) => {
      if (!postsFromDB) return null;

      const newPosts = postsFromDB.filter(
        (postFromDB) =>
          posts.find((post) => post._id === postFromDB._id) === undefined
      );
      //filter posts that are already in storage
      if (!newPosts) return null;

      dispatch(addToEndPosts(newPosts));
    },
    [dispatch, posts]
  );

  const setUserPostsRedux = useCallback(
    (postsFromDB) => {
      if (!postsFromDB) return null;

      const newPosts = postsFromDB.filter(
        (postFromDB) =>
          posts.find((post) => post._id === postFromDB._id) === undefined
      );
      if (!newPosts) return null;

      dispatch(addPosts(newPosts));
    },
    [dispatch, posts]
  );

  const deletePostRedux = useCallback(
    (_id) => dispatch(setPosts(posts.filter((post) => post._id !== _id))),
    [dispatch, posts]
  );

  const patchPostRedux = useCallback(
    (updatedPost) => {
      const newPosts = posts.slice(0);
      const postIndex = posts.findIndex((post) => post._id === updatedPost._id);
      newPosts[postIndex] = { ...updatedPost, user: user };
      dispatch(setPosts(newPosts));
    },
    [dispatch, posts, user]
  );

  const createPostRedux = useCallback(
    (newPostFromDB) => {
      dispatch(
        addPosts([
          {
            ...newPostFromDB,
            user: {
              _id: user._id,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              age: user.age,
              avatar: user?.avatar ? user.avatar : "https://picsum.photos/200",
            },
          },
        ])
      );
    },
    [dispatch, user]
  );

  return {
    setPostsRedux,
    deletePostRedux,
    patchPostRedux,
    setUserPostsRedux,
    createPostRedux,
  };
};
