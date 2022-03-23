import { Router } from "express";
import AnnouncementController from "../Controllers/AnnouncementController.js";
import { PATHS, ANNOUNCEMENT_PHOTOS_LIMIT } from "../config.js";
import FilesMiddleware from "../Middlewares/FilesMiddleware.js";
import AccessMiddleware from "../Middlewares/AccessMiddleware.js";
import ValidationMiddleware from "../Middlewares/Validation/ValidationMiddleware.js";

const AnnouncementRouter = new Router();

AnnouncementRouter.get(PATHS.getAnnouncements, AnnouncementController.getAll);
AnnouncementRouter.get(PATHS.getAnnouncement, AnnouncementController.getOne);
AnnouncementRouter.delete(
  PATHS.deleteAnnouncement,
  [AccessMiddleware],
  AnnouncementController.delete
);
AnnouncementRouter.patch(
  PATHS.updateAnnouncement,
  [
    FilesMiddleware.array("photos", ANNOUNCEMENT_PHOTOS_LIMIT),
    ValidationMiddleware,
    AccessMiddleware,
  ],
  AnnouncementController.update
);
AnnouncementRouter.post(
  PATHS.createAnnouncement,
  [
    FilesMiddleware.array("photos", ANNOUNCEMENT_PHOTOS_LIMIT),
    ValidationMiddleware,
    AccessMiddleware,
  ],
  AnnouncementController.create
);

export default AnnouncementRouter;
