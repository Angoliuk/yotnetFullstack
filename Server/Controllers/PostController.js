import { CreateExactPathes } from "../Helpers/ExactPath.js";
import PostService from "../Services/PostService.js";

class PostController {
  async getAll(req, res) {
    try {
      const posts = await PostService.getAll(req.query);
      return res.json(posts);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async getOne(req, res) {
    try {
      const posts = await PostService.get(req.params.id);
      return res.json(posts);
    } catch (e) {
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
        photos: [...oldPhotos, ...CreateExactPathes(req.files)],
      });
      return res.status(200).json(post);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async delete(req, res) {
    try {
      await PostService.delete(req.params.id, req.userId);
      return res.sendStatus(200);
    } catch (e) {
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
      return res.json(post);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new PostController();
