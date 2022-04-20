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
          posts.find((post) => post.id === postFromDB.id) === undefined
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
          posts.find((post) => post.id === postFromDB.id) === undefined
      );
      if (!newPosts) return null;

      dispatch(addPosts(newPosts));
    },
    [dispatch, posts]
  );

  const deletePostRedux = useCallback(
    (id) => dispatch(setPosts(posts.filter((post) => post.id !== id))),
    [dispatch, posts]
  );

  const patchPostRedux = useCallback(
    (updatedPost) => {
      const newPosts = posts.slice(0);
      const postIndex = posts.findIndex((post) => post.id === updatedPost.id);
      newPosts[postIndex] = {
        ...updatedPost,
        expanded: { ...updatedPost?.expanded, user: user },
      };
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
            expanded: {
              ...newPostFromDB?.expanded,
              user: user,
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
