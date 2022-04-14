import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useHttp } from "../../Hooks/Http/useHttp";

export const useApiCommentService = () => {
  const { request, xTotalCount } = useHttp();
  const token = useSelector((state) => state.userReducers.accessToken);

  const getCommentsApi = useCallback(
    async (id) => {
      const commentsFromDB = await request(
        `/comments/200?postId_like=${id}&_sort=createdAt&_order=desc&_expand=user`,
        "GET"
      );
      return commentsFromDB;
    },
    [request]
  );

  const deleteCommentApi = useCallback(
    async (id) => {
      await request(`/comments/440/${id}`, "DELETE", null, {
        Authorization: `Bearer ${token}`,
      });
    },
    [request, token]
  );

  const patchCommentApi = useCallback(
    async (id, changes) => {
      const changedComment = await request(
        `/comments/440/${id}`,
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
      const newCommentFromDB = await request(`/comments/420`, "POST", comment, {
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
