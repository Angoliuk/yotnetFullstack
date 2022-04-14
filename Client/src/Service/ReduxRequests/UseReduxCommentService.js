import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addComments,
  setComments,
} from "../../ReduxStorage/actions/postActions";

export const useReduxCommentService = () => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.postReducers.comments);
  const user = useSelector((state) => state.userReducers);

  const setCommentsRedux = useCallback(
    (commentsFromDB) => {
      if (!commentsFromDB) return null;

      const newComments = commentsFromDB.filter(
        (commentFromDB) =>
          comments.find((comment) => comment._id === commentFromDB._id) ===
          undefined
      );

      dispatch(addComments(newComments));
    },
    [comments, dispatch]
  );

  const deleteCommentRedux = useCallback(
    (id) =>
      dispatch(setComments(comments.filter((comment) => comment._id !== id))),
    [comments, dispatch]
  );

  const patchCommentRedux = useCallback(
    (changedComment) => {
      const newComments = comments.slice(0);
      const commentIndex = comments.findIndex(
        (comment) => comment._id === changedComment._id
      );
      newComments[commentIndex] = {
        ...changedComment,
      };
      dispatch(setComments(newComments));
    },
    [comments, dispatch]
  );

  const createCommentRedux = useCallback(
    (newCommentFromDB) => {
      dispatch(
        addComments([
          {
            ...newCommentFromDB,
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
    setCommentsRedux,
    deleteCommentRedux,
    patchCommentRedux,
    createCommentRedux,
  };
};
