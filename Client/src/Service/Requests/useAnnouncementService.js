import { useCallback, useState } from "react";
import { useApiAnnouncementService } from "../ApiRequests/useApiAnnouncementService";
import { useReduxAnnouncementService } from "../ReduxRequests/useReduxAnnouncementService";
import {
  AnnouncementSchema,
  AnnouncementUpdateSchema,
} from "../../Hooks/Validator/Schemas/Schemas";
import { useValidator } from "../../Hooks/Validator/useValidator";

export const useAnnouncementService = () => {
  const [announcementLoading, setAnnouncementLoading] = useState(false);
  const apiAnnouncementService = useApiAnnouncementService();
  const reduxAnnouncementService = useReduxAnnouncementService();
  const xTotalCount = apiAnnouncementService.xTotalCount;
  const { validate } = useValidator();

  const getAnnouncements = useCallback(
    async (page, limit) => {
      try {
        setAnnouncementLoading(true);
        const announcementsFromDB =
          await apiAnnouncementService.getAnnouncementsApi(page, limit);
        reduxAnnouncementService.setAnnouncementsRedux(announcementsFromDB);
      } catch (e) {
        throw e;
      } finally {
        setAnnouncementLoading(false);
      }
    },
    [apiAnnouncementService, reduxAnnouncementService]
  );

  const getUserAnnouncements = useCallback(
    async (_id) => {
      try {
        setAnnouncementLoading(true);
        const announcementsFromDB =
          await apiAnnouncementService.getUserAnnouncementsApi(_id);
        reduxAnnouncementService.setUserAnnouncementsRedux(announcementsFromDB);
      } catch (e) {
        throw e;
      } finally {
        setAnnouncementLoading(false);
      }
    },
    [apiAnnouncementService, reduxAnnouncementService]
  );

  const deleteAnnouncement = useCallback(
    async (_id) => {
      try {
        setAnnouncementLoading(true);
        await apiAnnouncementService.deleteAnnouncementApi(_id);
        reduxAnnouncementService.deleteAnnouncementRedux(_id);
      } catch (e) {
        throw e;
      } finally {
        setAnnouncementLoading(false);
      }
    },
    [apiAnnouncementService, reduxAnnouncementService]
  );

  const patchAnnouncement = useCallback(
    async (_id, changes) => {
      try {
        setAnnouncementLoading(true);
        await validate(changes, AnnouncementUpdateSchema);
        const updatedAnnouncement =
          await apiAnnouncementService.patchAnnouncementApi(_id, changes);
        reduxAnnouncementService.patchAnnouncementRedux(updatedAnnouncement);
      } catch (e) {
        throw e;
      } finally {
        setAnnouncementLoading(false);
      }
    },
    [apiAnnouncementService, reduxAnnouncementService]
  );

  const createAnnouncement = useCallback(
    async (announcement) => {
      try {
        setAnnouncementLoading(true);
        await validate(announcement, AnnouncementSchema);
        const newAnnouncementFromDB =
          await apiAnnouncementService.createAnnouncementApi(announcement);
        reduxAnnouncementService.createAnnouncementRedux(newAnnouncementFromDB);
      } catch (e) {
        throw e;
      } finally {
        setAnnouncementLoading(false);
      }
    },
    [apiAnnouncementService, reduxAnnouncementService]
  );

  return {
    getAnnouncements,
    deleteAnnouncement,
    patchAnnouncement,
    getUserAnnouncements,
    createAnnouncement,
    announcementLoading,
    xTotalCount,
  };
};
