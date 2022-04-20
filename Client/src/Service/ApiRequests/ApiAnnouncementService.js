import apiAuth from "../../Hooks/Http/ApiAuthRequests";
import api from "../../Hooks/Http/ApiRequests";

export class ApiAnnouncementService {
  static getAnnouncementsApi = async (page, limit) => {
    return await api.get(
      `/announcements?_page=${page}&_limit=${limit}&_expand=user&_sort=createdAt&_order=desc`
    );
  };

  static getUserAnnouncementsApi = async (id) => {
    return await api.get(
      `/announcements?_expand=user&userId_like=${id}&_sort=createdAt&_order=desc`
    );
  };

  static deleteAnnouncementApi = async (id) => {
    return await apiAuth.delete(`/announcements/${id}`);
  };

  static patchAnnouncementApi = async (id, changes) => {
    return await apiAuth.patch(`/announcements/${id}`, changes);
  };

  static createAnnouncementApi = async (announcement) => {
    return await apiAuth.post(`/announcements`, announcement);
  };
}
