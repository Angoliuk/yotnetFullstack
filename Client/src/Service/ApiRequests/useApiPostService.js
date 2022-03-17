import { useHttp } from "../../Hooks/Http/useHttp";
import { useCallback } from "react";
import { useSelector } from "react-redux";

export const useApiPostService = () => {
  const { request, xTotalCount } = useHttp();
  const token = useSelector((state) => state.userReducers.accessToken);

  const getPostsApi = useCallback(
    async (page, limit) => {
      const postsFromDB = await request(
        `/200/posts?_page=${page}&_limit=${limit}&_expand=user&_sort=createdAt&_order=desc`,
        "GET"
      );
      return postsFromDB;
    },
    [request]
  );

  const getUserPostsApi = useCallback(
    async (_id) => {
      const postsFromDB = await request(
        `/200/posts?_expand=user&userId_like=${_id}&_sort=createdAt&_order=desc`,
        "GET"
      );
      return postsFromDB;
    },
    [request]
  );

  const deletePostApi = useCallback(
    async (_id) => {
      await request(`/440/posts/${_id}`, "DELETE", null, {
        Authorization: `Bearer ${token}`,
      });
    },
    [request, token]
  );

  const patchPostApi = useCallback(
    async (_id, changes) => {
      const updatedPost = await request(
        `/440/posts/${_id}`,
        "PATCH",
        {
          ...changes,
          updatedAt: new Date(),
        },
        { Authorization: `Bearer ${token}` }
      );
      return updatedPost;
    },
    [request, token]
  );

  const createPostApi = useCallback(
    async (post) => {
      const newPostFromDB = await request("/420/posts", "POST", post, {
        Authorization: `Bearer ${token}`,
      });
      return newPostFromDB;
    },
    [token, request]
  );

  return {
    getPostsApi,
    deletePostApi,
    patchPostApi,
    getUserPostsApi,
    createPostApi,
    xTotalCount,
  };
};
