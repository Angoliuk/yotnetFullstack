import { Router } from "express";
import AnnouncementController from "../Controllers/AnnouncementController.js";
import { PATHS } from "../config.js";

const AnnouncementRouter = new Router();

AnnouncementRouter.get(PATHS.getAnnouncements, AnnouncementController.getAll);
AnnouncementRouter.get(PATHS.getAnnouncement, AnnouncementController.getOne);
AnnouncementRouter.delete(
  PATHS.deleteAnnouncement,
  AnnouncementController.delete
);
AnnouncementRouter.patch(
  PATHS.updateAnnouncement,
  AnnouncementController.update
);
AnnouncementRouter.post(
  PATHS.createAnnouncement,
  AnnouncementController.create
);

export default AnnouncementRouter;
