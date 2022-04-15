import apiAuth from "../../Hooks/Http/ApiAuthRequests";
import api from "../../Hooks/Http/ApiRequests";

export class ApiAnnouncementService {
  static getAnnouncementsApi = async (page, limit) => {
    const announcementsFromDB = await api.get(
      `/announcements/200?_page=${page}&_limit=${limit}&_expand=user&_sort=createdAt&_order=desc`
    );
    return announcementsFromDB;
  };

  static getUserAnnouncementsApi = async (id) => {
    const announcementsFromDB = await api.get(
      `/announcements/200?_expand=user&userId_like=${id}&_sort=createdAt&_order=desc`
    );
    return announcementsFromDB;
  };

  static deleteAnnouncementApi = async (id) => {
    await apiAuth.delete(`/announcements/440/${id}`);
  };

  static patchAnnouncementApi = async (id, changes) => {
    const updatedAnnouncement = await apiAuth.patch(
      `/announcements/440/${id}`,
      changes
    );

    return updatedAnnouncement;
  };

  static createAnnouncementApi = async (announcement) => {
    const newAnnouncementFromDB = await apiAuth.post(
      `/announcements/420`,
      announcement
    );

    return newAnnouncementFromDB;
  };
}
