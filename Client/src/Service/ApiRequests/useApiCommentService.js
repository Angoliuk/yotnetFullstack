import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useHttp } from "../../Hooks/Http/useHttp";

export const useApiCommentService = () => {
  const { request, xTotalCount } = useHttp();
  const token = useSelector((state) => state.userReducers.accessToken);

  const getCommentsApi = useCallback(
    async (_id) => {
      const commentsFromDB = await request(
        `/200/comments?postId_like=${_id}&_sort=createdAt&_order=desc&_expand=user`,
        "GET"
      );
      return commentsFromDB;
    },
    [request]
  );

  const deleteCommentApi = useCallback(
    async (_id) => {
      await request(`/440/comments/${_id}`, "DELETE", null, {
        Authorization: `Bearer ${token}`,
      });
    },
    [request, token]
  );

  const patchCommentApi = useCallback(
    async (_id, changes) => {
      const changedComment = await request(
        `/440/comments/${_id}`,
        "PATCH",
        {
          ...changes,
          updatedAt: new Date(),
        },
        { Authorization: `Bearer ${token}` }
      );
      return changedComment;
    },
    [request, token]
  );

  const createCommentApi = useCallback(
    async (comment) => {
      const newCommentFromDB = await request(`/420/comments`, "POST", comment, {
        Authorization: `Bearer ${token}`,
      });
      return newCommentFromDB;
    },
    [request, token]
  );

  return {
    getCommentsApi,
    deleteCommentApi,
    patchCommentApi,
    createCommentApi,
    xTotalCount,
  };
};
