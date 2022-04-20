import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../ReduxStorage/actions/userActions";
import { setComments, setPosts } from "../../ReduxStorage/actions/postActions";
import { setAnnouncements } from "../../ReduxStorage/actions/announcementActions";
import { useCallback } from "react";

export const useReduxUserService = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducers.posts);
  const announcements = useSelector(
    (state) => state.announcementReducers.announcements
  );
  const comments = useSelector((state) => state.postReducers.comments);

  const loginRedux = (loggedUser) => dispatch(login(loggedUser));

  const logoutRedux = () => dispatch(logout());

  const updateUserRedux = useCallback(
    (updatedUser) => {
      dispatch(
        setComments(
          comments
            .filter(
              (comment) => String(comment.userId) === String(updatedUser.id)
            )
            .map((item) => (item.expanded.user = updatedUser))
        )
      );
      dispatch(
        setPosts(
          posts
            .filter((post) => String(post.userId) === String(updatedUser.id))
            .map((item) => (item.expanded.user = updatedUser))
        )
      );
      dispatch(
        setAnnouncements(
          announcements
            .filter(
              (announcement) =>
                String(announcement.userId) === String(updatedUser.id)
            )
            .map((item) => (item.expanded.user = updatedUser))
        )
      );

      dispatch(
        login({
          ...updatedUser,
          accessToken: JSON.parse(localStorage.getItem("userData"))
            ?.accessToken,
        })
      );
    },
    [announcements, posts, dispatch, comments]
  );

  const deleteUserRedux = useCallback(
    (userId) => {
      dispatch(
        setComments(
          comments.filter(
            (comment) => String(comment.userId) !== String(userId)
          )
        )
      );
      dispatch(
        setPosts(posts.filter((post) => String(post.userId) !== String(userId)))
      );
      dispatch(
        setAnnouncements(
          announcements.filter(
            (announcement) => String(announcement.userId) !== String(userId)
          )
        )
      );
      dispatch(logout());
    },
    [announcements, posts, dispatch, comments]
  );

  return { loginRedux, updateUserRedux, logoutRedux, deleteUserRedux };
};
