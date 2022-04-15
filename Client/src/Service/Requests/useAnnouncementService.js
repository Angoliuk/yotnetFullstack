import { useCallback, useState } from "react";
import { useReduxAnnouncementService } from "../ReduxRequests/useReduxAnnouncementService";
import {
  AnnouncementSchema,
  AnnouncementUpdateSchema,
} from "../../Hooks/Validator/Schemas/Schemas";
import { useValidator } from "../../Hooks/Validator/useValidator";
import { ApiAnnouncementService } from "../ApiRequests/ApiAnnouncementService";

export const useAnnouncementService = () => {
  const [announcementLoading, setAnnouncementLoading] = useState(false);
  const reduxAnnouncementService = useReduxAnnouncementService();
  // const xTotalCount = apiAnnouncementService.xTotalCount;
  const { validate } = useValidator();

  const getAnnouncements = useCallback(
    async (page, limit) => {
      try {
        setAnnouncementLoading(true);
        const announcementsFromDB =
          await ApiAnnouncementService.getAnnouncementsApi(page, limit);
        reduxAnnouncementService.setAnnouncementsRedux(announcementsFromDB);
      } catch (e) {
        throw e;
      } finally {
        setAnnouncementLoading(false);
      }
    },
    [reduxAnnouncementService]
  );

  const getUserAnnouncements = useCallback(
    async (id) => {
      try {
        setAnnouncementLoading(true);
        const announcementsFromDB =
          await ApiAnnouncementService.getUserAnnouncementsApi(id);
        reduxAnnouncementService.setUserAnnouncementsRedux(announcementsFromDB);
      } catch (e) {
        throw e;
      } finally {
        setAnnouncementLoading(false);
      }
    },
    [reduxAnnouncementService]
  );

  const deleteAnnouncement = useCallback(
    async (id) => {
      try {
        setAnnouncementLoading(true);
        await ApiAnnouncementService.deleteAnnouncementApi(id);
        reduxAnnouncementService.deleteAnnouncementRedux(id);
      } catch (e) {
        throw e;
      } finally {
        setAnnouncementLoading(false);
      }
    },
    [reduxAnnouncementService]
  );

  const patchAnnouncement = useCallback(
    async (id, changes) => {
      try {
        setAnnouncementLoading(true);
        await validate(changes, AnnouncementUpdateSchema);
        const formData = new FormData();
        if (changes.oldPhotos)
          changes.oldPhotos = JSON.stringify(changes.oldPhotos);
        for (const key in changes) {
          if (key !== "photos") {
            formData.append(key, changes[key]);
          } else if (key === "photos") {
            for (let i = 0; i < changes.photos.length; i++) {
              formData.append("photos", changes.photos[i]);
            }
          }
        }
        const updatedAnnouncement =
          await ApiAnnouncementService.patchAnnouncementApi(id, formData);
        reduxAnnouncementService.patchAnnouncementRedux(updatedAnnouncement);
      } catch (e) {
        throw e;
      } finally {
        setAnnouncementLoading(false);
      }
    },
    [reduxAnnouncementService]
  );

  const createAnnouncement = useCallback(
    async (announcement) => {
      try {
        setAnnouncementLoading(true);
        await validate(announcement, AnnouncementSchema);
        const formData = new FormData();
        for (const key in announcement) {
          if (key !== "photos") {
            formData.append(key, announcement[key]);
          } else {
            for (let i = 0; i < announcement.photos.length; i++) {
              formData.append("photos", announcement.photos[i]);
            }
          }
        }
        const newAnnouncementFromDB =
          await ApiAnnouncementService.createAnnouncementApi(formData);
        reduxAnnouncementService.createAnnouncementRedux(newAnnouncementFromDB);
      } catch (e) {
        throw e;
      } finally {
        setAnnouncementLoading(false);
      }
    },
    [reduxAnnouncementService]
  );

  return {
    getAnnouncements,
    deleteAnnouncement,
    patchAnnouncement,
    getUserAnnouncements,
    createAnnouncement,
    announcementLoading,
  };
};
