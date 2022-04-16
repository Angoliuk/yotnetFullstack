import apiAuth from "../../Hooks/Http/ApiAuthRequests";
import api from "../../Hooks/Http/ApiRequests";

export class ApiPostService {
  static getPostsApi = async (page, limit) => {
    return await api.get(
      `/posts/200?_page=${page}&_limit=${limit}&_expand=user&_sort=createdAt&_order=desc`
    );
  };

  static getUserPostsApi = async (id) => {
    return await api.get(
      `/posts/200?_expand=user&userId_like=${id}&_sort=createdAt&_order=desc`
    );
  };

  static deletePostApi = async (id) => {
    return await apiAuth.delete(`/posts/440/${id}`);
  };

  static patchPostApi = async (id, changes) => {
    return await apiAuth.patch(`/posts/440/${id}`, changes);
  };

  static createPostApi = async (post) => {
    return await apiAuth.post("/posts/420", post);
  };
}
