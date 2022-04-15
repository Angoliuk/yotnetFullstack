import apiAuth from "../../Hooks/Http/ApiAuthRequests";
import api from "../../Hooks/Http/ApiRequests";

export class ApiPostService {
  static getPostsApi = async (page, limit) => {
    const postsFromDB = await api.get(
      `/posts/200?_page=${page}&_limit=${limit}&_expand=user&_sort=createdAt&_order=desc`
    );
    return postsFromDB;
  };

  static getUserPostsApi = async (id) => {
    const postsFromDB = await api.get(
      `/posts/200?_expand=user&userId_like=${id}&_sort=createdAt&_order=desc`
    );
    return postsFromDB;
  };

  static deletePostApi = async (id) => {
    await apiAuth.delete(`/posts/440/${id}`);
  };

  static patchPostApi = async (id, changes) => {
    const updatedPost = await apiAuth.patch(`/posts/440/${id}`, changes);
    return updatedPost;
  };

  static createPostApi = async (post) => {
    const newPostFromDB = await apiAuth.create("/posts/420", post);
    return newPostFromDB;
  };
}
