import { logger } from "../Logs/Logger.js";
import CommentService from "../Services/CommentService.js";

class CommentController {
  async getAll(req, res) {
    try {
      const comments = await CommentService.getAll(req.query);
      logger.info("CommentController getAll done");
      return res.json(comments);
    } catch (e) {
      logger.error(`CommentController getAll. ${e.message}`);
      res.status(500).json(e);
    }
  }
  async getOne(req, res) {
    try {
      const comments = await CommentService.get(req.params.id);
      logger.info("CommentController getOne done");
      return res.json(comments);
    } catch (e) {
      logger.error(`CommentController getOne. ${e.message}`);
      res.status(500).json(e);
    }
  }

  async update(req, res) {
    try {
      const { body, createdAt, updatedAt, postId, userId } = req.body;
      const comment = await CommentService.update(req.params.id, {
        body,
        createdAt,
        updatedAt,
        postId,
        userId,
      });
      logger.info("CommentController update done");
      return res.json(comment);
    } catch (e) {
      logger.error(`CommentController update. ${e.message}`);
      res.status(500).json(e);
    }
  }

  async delete(req, res) {
    try {
      await CommentService.delete(req.params.id, req.userId);
      logger.info("CommentController delete done");
      return res.sendStatus(200);
    } catch (e) {
      logger.error(`CommentController delete. ${e.message}`);
      res.status(500).json(e);
    }
  }

  async create(req, res) {
    try {
      const { body, createdAt, updatedAt, postId, userId } = req.body;
      const comment = await CommentService.create(
        {
          body,
          postId,
          userId,
          createdAt,
          updatedAt,
        },
        req.userId
      );
      logger.info("CommentController create done");
      res.json(comment);
    } catch (e) {
      logger.error(`CommentController create. ${e.message}`);
      res.status(500).json(e);
    }
  }
}

export default new CommentController();
