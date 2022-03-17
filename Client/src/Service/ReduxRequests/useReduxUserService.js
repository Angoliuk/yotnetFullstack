import { useDispatch, useSelector } from "react-redux";
import { login } from "../../ReduxStorage/actions/userActions";
import { setComments, setPosts } from "../../ReduxStorage/actions/postActions";
import { setAnnouncements } from "../../ReduxStorage/actions/announcementActions";
import { useCallback } from "react";

export const useReduxUserService = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducers.posts);
  const announcements = useSelector((state) => state.postReducers.posts);
  const comments = useSelector((state) => state.postReducers.posts);

  const loginRedux = (loggedUser) => dispatch(login(loggedUser));

  const updateUserRedux = useCallback(
    (updatedUser) => {
      posts
        .filter((post) => String(post.userId) === String(updatedUser._id))
        .map((item) => (item.user = updatedUser));
      comments
        .filter((comment) => String(comment.userId) === String(updatedUser._id))
        .map((item) => (item.user = updatedUser));
      announcements
        .filter(
          (announcement) =>
            String(announcement.userId) === String(updatedUser._id)
        )
        .map((item) => (item.user = updatedUser));

      dispatch(setComments(comments));
      dispatch(setPosts(posts));
      dispatch(setAnnouncements(announcements));

      dispatch(login({ ...updatedUser, accessToken: updatedUser.accessToken }));
    },
    [announcements, posts, dispatch, comments]
  );

  return { loginRedux, updateUserRedux };
};
