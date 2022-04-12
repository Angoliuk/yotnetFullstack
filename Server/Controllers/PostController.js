import { CreateExactPathes } from "../Helpers/ExactPath.js";
import { logger } from "../Logs/Logger.js";
import PostService from "../Services/PostService.js";

class PostController {
  async getAll(req, res) {
    try {
      const posts = await PostService.getAll(req.query);
      logger.info("PostController getAll done");
      return res.json(posts);
    } catch (e) {
      logger.error(`PostController getAll. ${e.message}`);
      res.status(500).json(e);
    }
  }
  async getOne(req, res) {
    try {
      const posts = await PostService.get(req.params.id);
      logger.info("PostController getOne done");
      return res.json(posts);
    } catch (e) {
      logger.error(`PostController getOne. ${e.message}`);
      res.status(500).json(e);
    }
  }

  async update(req, res) {
    try {
      const { title, body, userId, createdAt, updatedAt, oldPhotos } = req.body;
      const post = await PostService.update(req.params.id, {
        title,
        body,
        userId,
        createdAt,
        updatedAt,
        photos: [...JSON.parse(oldPhotos), ...CreateExactPathes(req.files)],
      });
      logger.info("PostController update done");
      return res.status(200).json(post);
    } catch (e) {
      logger.error(`PostController update. ${e.message}`);
      res.status(500).json(e);
    }
  }

  async delete(req, res) {
    try {
      await PostService.delete(req.params.id, req.userId);
      logger.info("PostController delete done");
      return res.sendStatus(200);
    } catch (e) {
      logger.error(`PostController delete. ${e.message}`);
      res.status(500).json(e);
    }
  }

  async create(req, res) {
    try {
      const { title, body, userId, createdAt, updatedAt } = req.body;
      const post = await PostService.create(
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
      logger.info("PostController create done");
      return res.json(post);
    } catch (e) {
      logger.error(`PostController create. ${e.message}`);
      res.status(500).json(e);
    }
  }
}

export default new PostController();
