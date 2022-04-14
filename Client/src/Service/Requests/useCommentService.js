import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useApiCommentService } from "../ApiRequests/useApiCommentService";
import { useReduxCommentService } from "../ReduxRequests/UseReduxCommentService";
import {
  CommentSchema,
  CommentUpdateSchema,
} from "../../Hooks/Validator/Schemas/Schemas";
import { useValidator } from "../../Hooks/Validator/useValidator";

export const useCommentService = () => {
  const [commentLoading, setCommentLoading] = useState(false);
  const apiCommentService = useApiCommentService();
  const reduxCommentService = useReduxCommentService();
  const user = useSelector((state) => state.userReducers);
  const xTotalCount = apiCommentService.xTotalCount;
  const { validate } = useValidator();

  const getComments = useCallback(
    async (id) => {
      try {
        setCommentLoading(true);
        const commentsFromDB = await apiCommentService.getCommentsApi(id);
        reduxCommentService.setCommentsRedux(commentsFromDB);
      } catch (e) {
        throw e;
      } finally {
        setCommentLoading(false);
      }
    },
    [apiCommentService, reduxCommentService]
  );

  const deleteComment = useCallback(
    async (id) => {
      try {
        setCommentLoading(true);
        await apiCommentService.deleteCommentApi(id);
        reduxCommentService.deleteCommentRedux(id);
      } catch (e) {
        throw e;
      } finally {
        setCommentLoading(false);
      }
    },
    [apiCommentService, reduxCommentService]
  );

  const patchComment = useCallback(
    async (id, changes) => {
      try {
        setCommentLoading(true);
        await validate(changes, CommentUpdateSchema);
        const changedComment = await apiCommentService.patchCommentApi(
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
    [apiCommentService, reduxCommentService]
  );

  const createComment = useCallback(
    async (comment) => {
      try {
        setCommentLoading(true);
        await validate(comment, CommentSchema);
        console.log(comment);
        const newCommentFromDB = await apiCommentService.createCommentApi(
          comment
        );
        reduxCommentService.createCommentRedux(newCommentFromDB);
      } catch (e) {
        throw e;
      } finally {
        setCommentLoading(false);
      }
    },
    [apiCommentService, reduxCommentService]
  );

  return {
    getComments,
    deleteComment,
    patchComment,
    createComment,
    commentLoading,
    xTotalCount,
  };
};
