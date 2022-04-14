import { useHttp } from "../../Hooks/Http/useHttp";
import { useCallback } from "react";
import { useSelector } from "react-redux";

export const useApiPostService = () => {
  const { request, xTotalCount } = useHttp();
  const token = useSelector((state) => state.userReducers.accessToken);

  const getPostsApi = useCallback(
    async (page, limit) => {
      const postsFromDB = await request(
        `/posts/200?_page=${page}&_limit=${limit}&_expand=user&_sort=createdAt&_order=desc`,
        "GET"
      );
      return postsFromDB;
    },
    [request]
  );

  const getUserPostsApi = useCallback(
    async (id) => {
      const postsFromDB = await request(
        `/posts/200?_expand=user&userId_like=${id}&_sort=createdAt&_order=desc`,
        "GET"
      );
      return postsFromDB;
    },
    [request]
  );

  const deletePostApi = useCallback(
    async (id) => {
      await request(`/posts/440/${id}`, "DELETE", null, {
        Authorization: `Bearer ${token}`,
      });
    },
    [request, token]
  );

  const patchPostApi = useCallback(
    async (id, changes) => {
      const updatedPost = await request(`/posts/440/${id}`, "PATCH", changes, {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      });
      return updatedPost;
    },
    [request, token]
  );

  const createPostApi = useCallback(
    async (post) => {
      const newPostFromDB = await request("/posts/420", "POST", post, {
        "content-type": "multipart/form-data",
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
