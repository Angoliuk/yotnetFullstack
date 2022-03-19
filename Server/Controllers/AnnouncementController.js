import AnnouncementService from "../Services/AnnouncementService.js";

class AnnouncementController {
  async getAll(req, res) {
    try {
      const announcements = await AnnouncementService.getAll(req.query);
      return res.json(announcements);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async getOne(req, res) {
    try {
      const announcements = await AnnouncementService.get(req.params.id);
      return res.json(announcements);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async update(req, res) {
    try {
      const { title, body, userId, createdAt, updatedAt } = req.body;
      const announcement = await AnnouncementService.update(req.params.id, {
        title,
        body,
        userId,
        createdAt,
        updatedAt,
      });
      return res.json(announcement);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async delete(req, res) {
    try {
      await AnnouncementService.delete(req.params.id, req.userId);
      return res.sendStatus(200);
    } catch (e) {
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
        },
        req.userId
      );
      res.json(announcement);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new AnnouncementController();
