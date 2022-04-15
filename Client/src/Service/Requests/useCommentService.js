import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { ApiCommentService } from "../ApiRequests/ApiCommentService";
import { useReduxCommentService } from "../ReduxRequests/UseReduxCommentService";
import {
  CommentSchema,
  CommentUpdateSchema,
} from "../../Hooks/Validator/Schemas/Schemas";
import { useValidator } from "../../Hooks/Validator/useValidator";

export const useCommentService = () => {
  const [commentLoading, setCommentLoading] = useState(false);
  const reduxCommentService = useReduxCommentService();
  const user = useSelector((state) => state.userReducers);
  // const xTotalCount = apiCommentService.xTotalCount;
  const { validate } = useValidator();

  const getComments = useCallback(
    async (id) => {
      try {
        setCommentLoading(true);
        const commentsFromDB = await ApiCommentService.getCommentsApi(id);
        reduxCommentService.setCommentsRedux(commentsFromDB);
      } catch (e) {
        throw e;
      } finally {
        setCommentLoading(false);
      }
    },
    [reduxCommentService]
  );

  const deleteComment = useCallback(
    async (id) => {
      try {
        setCommentLoading(true);
        await ApiCommentService.deleteCommentApi(id);
        reduxCommentService.deleteCommentRedux(id);
      } catch (e) {
        throw e;
      } finally {
        setCommentLoading(false);
      }
    },
    [reduxCommentService]
  );

  const patchComment = useCallback(
    async (id, changes) => {
      try {
        setCommentLoading(true);
        await validate(changes, CommentUpdateSchema);
        const changedComment = await ApiCommentService.patchCommentApi(
          id,
          changes
        );
        reduxCommentService.patchCommentRedux({
          ...changedComment,
          user: user,
        });
      } catch (e) {
        throw e;
      } finally {
        setCommentLoading(false);
      }
    },
    [reduxCommentService]
  );

  const createComment = useCallback(
    async (comment) => {
      try {
        setCommentLoading(true);
        await validate(comment, CommentSchema);
        const newCommentFromDB = await ApiCommentService.createCommentApi(
          comment
        );
        reduxCommentService.createCommentRedux(newCommentFromDB);
      } catch (e) {
        throw e;
      } finally {
        setCommentLoading(false);
      }
    },
    [reduxCommentService]
  );

  return {
    getComments,
    deleteComment,
    patchComment,
    createComment,
    commentLoading,
  };
};
