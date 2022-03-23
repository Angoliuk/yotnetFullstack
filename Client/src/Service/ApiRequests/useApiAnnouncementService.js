import { useSelector } from "react-redux";
import { useHttp } from "../../Hooks/Http/useHttp";
import { useCallback } from "react";

export const useApiAnnouncementService = () => {
  const { request, xTotalCount } = useHttp();
  const token = useSelector((state) => state.userReducers.accessToken);
  const getAnnouncementsApi = useCallback(
    async (page, limit) => {
      const announcementsFromDB = await request(
        `/announcements/200?_page=${page}&_limit=${limit}&_expand=user&_sort=createdAt&_order=desc`,
        "GET"
      );
      return announcementsFromDB;
    },
    [request]
  );

  const getUserAnnouncementsApi = useCallback(
    async (_id) => {
      const announcementsFromDB = await request(
        `/announcements/200?_expand=user&userId_like=${_id}&_sort=createdAt&_order=desc`,
        "GET"
      );
      return announcementsFromDB;
    },
    [request]
  );

  const deleteAnnouncementApi = useCallback(
    async (_id) => {
      await request(`/announcements/440/${_id}`, "DELETE", null, {
        Authorization: `Bearer ${token}`,
      });
    },
    [request, token]
  );

  const patchAnnouncementApi = useCallback(
    async (_id, changes) => {
      const updatedAnnouncement = await request(
        `/announcements/440/${_id}`,
        "PATCH",
        {
          ...changes,
          updatedAt: new Date(),
        },
        {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );
      return updatedAnnouncement;
    },
    [request, token]
  );

  const createAnnouncementApi = useCallback(
    async (announcement) => {
      const newAnnouncementFromDB = await request(
        "/announcements/420",
        "POST",
        announcement,
        {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );
      return newAnnouncementFromDB;
    },
    [token, request]
  );

  return {
    getAnnouncementsApi,
    deleteAnnouncementApi,
    patchAnnouncementApi,
    getUserAnnouncementsApi,
    createAnnouncementApi,
    xTotalCount,
  };
};
