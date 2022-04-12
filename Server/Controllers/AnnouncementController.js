import { CreateExactPathes } from "../Helpers/ExactPath.js";
import { logger } from "../Logs/Logger.js";
import AnnouncementService from "../Services/AnnouncementService.js";

class AnnouncementController {
  async getAll(req, res) {
    try {
      const announcements = await AnnouncementService.getAll(req.query);
      logger.info("AnnouncementController getAll done");
      return res.json(announcements);
    } catch (e) {
      logger.error(`AnnouncementController getAll. ${e.message}`);
      res.status(500).json(e);
    }
  }
  async getOne(req, res) {
    try {
      const announcements = await AnnouncementService.get(req.params.id);
      logger.info("AnnouncementController getOne done");
      return res.json(announcements);
    } catch (e) {
      logger.error(`AnnouncementController getOne. ${e.message}`);
      res.status(500).json(e);
    }
  }

  async update(req, res) {
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
      res.status(500).json(e);
    }
  }

  async delete(req, res) {
    try {
      await AnnouncementService.delete(req.params.id, req.userId);
      logger.info("AnnouncementController delete done");
      return res.sendStatus(200);
    } catch (e) {
      logger.error(`AnnouncementController delete. ${e.message}`);
      res.status(500).json(e);
    }
  }

  async create(req, res) {
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
      res.status(500).json(e);
    }
  }
}

export default new AnnouncementController();
