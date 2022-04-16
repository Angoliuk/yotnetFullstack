import { useDispatch, useSelector } from "react-redux";
import {
  addAnnouncements,
  addToEndAnnouncements,
  setAnnouncements,
} from "../../ReduxStorage/actions/announcementActions";
import { useCallback } from "react";

export const useReduxAnnouncementService = () => {
  const dispatch = useDispatch();
  const announcements = useSelector(
    (state) => state.announcementReducers.announcements
  );
  const user = useSelector((state) => state.userReducers);
  const setAnnouncementsRedux = useCallback(
    (announcementsFromDB) => {
      if (!announcementsFromDB) return null;

      const newAnnouncements = announcementsFromDB.filter(
        (announcementFromDB) =>
          announcements.find(
            (announcement) => announcement.id === announcementFromDB.id
          ) === undefined
      );
      //filter announcements that are already in storage

      if (!newAnnouncements) return null;

      dispatch(addToEndAnnouncements(newAnnouncements));
    },
    [dispatch, announcements]
  );

  const setUserAnnouncementsRedux = useCallback(
    (announcementsFromDB) => {
      if (!announcementsFromDB) return null;

      const newAnnouncements = announcementsFromDB.filter(
        (announcementsFromDB) =>
          announcements.find(
            (announcement) => announcement.id === announcementsFromDB.id
          ) === undefined
      );
      if (!newAnnouncements) return null;

      dispatch(addAnnouncements(newAnnouncements));
    },
    [dispatch, announcements]
  );

  const deleteAnnouncementRedux = useCallback(
    (id) => {
      dispatch(
        setAnnouncements(
          announcements.filter((announcement) => announcement.id !== id)
        )
      );
    },
    [dispatch, announcements]
  );

  const patchAnnouncementRedux = useCallback(
    (updatedAnnouncement) => {
      const newAnnouncements = announcements.slice(0);
      const announcementIndex = announcements.findIndex(
        (announcement) => announcement.id === updatedAnnouncement.id
      );
      newAnnouncements[announcementIndex] = {
        ...updatedAnnouncement,
        user: user,
      };
      dispatch(setAnnouncements(newAnnouncements));
    },
    [dispatch, announcements, user]
  );

  const createAnnouncementRedux = useCallback(
    (newAnnouncementFromDB) => {
      dispatch(
        addAnnouncements([
          {
            ...newAnnouncementFromDB,
            expanded: {
              ...newAnnouncementFromDB?.expanded,
              user: {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                age: user.age,
                avatar: user?.avatar
                  ? user.avatar
                  : "https://picsum.photos/200",
              },
            },
          },
        ])
      );
    },
    [dispatch, user]
  );

  return {
    setAnnouncementsRedux,
    deleteAnnouncementRedux,
    patchAnnouncementRedux,
    setUserAnnouncementsRedux,
    createAnnouncementRedux,
  };
};
