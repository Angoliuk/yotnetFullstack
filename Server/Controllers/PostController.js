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
      const { title, body, userId, createdAt, updatedAt } = req.body;
      const post = await PostService.update(req.params.id, {
        title,
        body,
        userId,
        createdAt,
        updatedAt,
      });
      return res.json(post);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async delete(req, res) {
    try {
      const post = await PostService.delete(req.params.id);
      return res.json(post);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async create(req, res) {
    try {
      const { title, body, userId, createdAt, updatedAt } = req.body;
      const post = await PostService.create({
        title,
        body,
        userId,
        createdAt,
        updatedAt,
      });
      res.json(post);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new PostController();
