import { CreateExactPathes } from "../Helpers/ExactPath.js";
import { logger } from "../Logs/Logger.js";
import AnnouncementService from "../Services/AnnouncementService.js";

class AnnouncementController {
  async getAll(req, res, next) {
    try {
      const announcements = await AnnouncementService.getAll(req.query);
      logger.info("AnnouncementController getAll done");
      return res.json(announcements);
    } catch (e) {
      logger.error(`AnnouncementController getAll. ${e.message}`);
      next(e);
    }
  }
  async getOne(req, res, next) {
    try {
      const announcements = await AnnouncementService.get(req.params.id);
      logger.info("AnnouncementController getOne done");
      return res.json(announcements);
    } catch (e) {
      logger.error(`AnnouncementController getOne. ${e.message}`);
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { title, body, userId, createdAt, updatedAt, oldPhotos } = req.body;
      const announcement = await AnnouncementService.update(req.params.id, {
        title,
        body,
        userId,
        createdAt,
        updatedAt,
        photos: [...JSON.parse(oldPhotos), ...CreateExactPathes(req.files)],
      });
      logger.info("AnnouncementController update done");
      return res.json(announcement);
    } catch (e) {
      logger.error(`AnnouncementController update. ${e.message}`);
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      await AnnouncementService.delete(req.params.id, req.userId);
      logger.info("AnnouncementController delete done");
      return res.sendStatus(200);
    } catch (e) {
      logger.error(`AnnouncementController delete. ${e.message}`);
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const { title, body, userId, createdAt, updatedAt } = req.body;
      const announcement = await AnnouncementService.create(
        {
          title,
          body,
          userId,
          createdAt,
          updatedAt,
          photos: CreateExactPathes(req.files),
        },
        req.userId
      );
      logger.info("AnnouncementController create done");
      res.json(announcement);
    } catch (e) {
      logger.error(`AnnouncementController create. ${e.message}`);
      next(e);
    }
  }
}

export default new AnnouncementController();
