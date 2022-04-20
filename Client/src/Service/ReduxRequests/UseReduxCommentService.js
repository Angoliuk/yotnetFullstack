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
          comments.find((comment) => comment.id === commentFromDB.id) ===
          undefined
      );

      dispatch(addComments(newComments));
    },
    [comments, dispatch]
  );

  const deleteCommentRedux = useCallback(
    (id) =>
      dispatch(setComments(comments.filter((comment) => comment.id !== id))),
    [comments, dispatch]
  );

  const patchCommentRedux = useCallback(
    (changedComment) => {
      const newComments = comments.slice(0);
      const commentIndex = comments.findIndex(
        (comment) => comment.id === changedComment.id
      );
      newComments[commentIndex] = {
        ...changedComment,
        expanded: {
          ...changedComment?.expanded,
          user: user,
        },
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
            expanded: {
              ...newCommentFromDB?.expanded,
              user: user,
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
