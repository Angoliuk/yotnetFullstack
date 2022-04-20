import { Router } from "express";
import AnnouncementController from "../Controllers/AnnouncementController.js";
import { PATHS, ANNOUNCEMENT_PHOTOS_LIMIT } from "../config.js";
import FilesMiddleware from "../Middlewares/FilesMiddleware.js";
import ValidationMiddleware from "../Middlewares/Validation/ValidationMiddleware.js";
import OwnerMiddleware from "../Middlewares/OwnerMiddleware.js";
import AuthMiddleware from "../Middlewares/AuthMiddleware.js";

const AnnouncementRouter = new Router();

AnnouncementRouter.get(PATHS.getAnnouncements, AnnouncementController.getAll);
AnnouncementRouter.get(PATHS.getAnnouncement, AnnouncementController.getOne);
AnnouncementRouter.delete(
  PATHS.deleteAnnouncement,
  OwnerMiddleware,
  AnnouncementController.delete
);
AnnouncementRouter.patch(
  PATHS.updateAnnouncement,
  [
    FilesMiddleware.array("photos", ANNOUNCEMENT_PHOTOS_LIMIT),
    ValidationMiddleware,
    OwnerMiddleware,
  ],
  AnnouncementController.update
);
AnnouncementRouter.post(
  PATHS.createAnnouncement,
  [
    FilesMiddleware.array("photos", ANNOUNCEMENT_PHOTOS_LIMIT),
    ValidationMiddleware,
    AuthMiddleware,
  ],
  AnnouncementController.create
);

export default AnnouncementRouter;
