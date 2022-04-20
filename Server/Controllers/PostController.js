import { CreateExactPathes } from "../Helpers/ExactPath.js";
import { logger } from "../Logs/Logger.js";
import PostService from "../Services/PostService.js";

class PostController {
  async getAll(req, res, next) {
    try {
      const posts = await PostService.getAll(req.query);
      logger.info("PostController getAll done");
      return res.json(posts);
    } catch (e) {
      logger.error(`PostController getAll. ${e.message}`);
      next(e);
    }
  }
  async getOne(req, res, next) {
    try {
      const posts = await PostService.get(req.params.id);
      logger.info("PostController getOne done");
      return res.json(posts);
    } catch (e) {
      logger.error(`PostController getOne. ${e.message}`);
      next(e);
    }
  }

  async update(req, res, next) {
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
      return res.json(post);
    } catch (e) {
      logger.error(`PostController update. ${e.message}`);
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      await PostService.delete(req.params.id, req.userId);
      logger.info("PostController delete done");
      return res.sendStatus(200);
    } catch (e) {
      logger.error(`PostController delete. ${e.message}`);
      next(e);
    }
  }

  async create(req, res, next) {
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
        userId
      );
      logger.info("PostController create done");
      return res.json(post);
    } catch (e) {
      logger.error(`PostController create. ${e.message}`);
      next(e);
    }
  }
}

export default new PostController();
