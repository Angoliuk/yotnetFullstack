import apiAuth from "../../Hooks/Http/ApiAuthRequests";
import api from "../../Hooks/Http/ApiRequests";

export class ApiCommentService {
  static getCommentsApi = async (id) => {
    return await api.get(
      `/comments?postId_like=${id}&_sort=createdAt&_order=desc&_expand=user`,
      "GET"
    );
  };

  static deleteCommentApi = async (id) => {
    return await apiAuth.delete(`/comments/${id}`);
  };

  static patchCommentApi = async (id, changes) => {
    return await apiAuth.patch(`/comments/${id}`, {
      ...changes,
      updatedAt: new Date(),
    });
  };

  static createCommentApi = async (comment) => {
    return await apiAuth.post(`/comments`, comment);
  };
}
