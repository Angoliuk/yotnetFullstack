import CommentService from "../Services/CommentService.js";

class CommentController {
  async getAll(req, res) {
    try {
      const comments = await CommentService.getAll(req.query);
      return res.json(comments);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async getOne(req, res) {
    try {
      const comments = await CommentService.get(req.params.id);
      return res.json(comments);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async update(req, res) {
    try {
      const { title, body, userId, createdAt, updatedAt } = req.body;
      const comment = await CommentService.update(req.params.id, {
        title,
        body,
        userId,
        createdAt,
        updatedAt,
      });

      return res.json(comment);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async delete(req, res) {
    try {
      const comment = await CommentService.delete(req.params.id);
      return res.json(comment);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async create(req, res) {
    try {
      const { body, createdAt, updatedAt, postId, userId } = req.body;
      const comment = await CommentService.create({
        body,
        postId,
        userId,
        createdAt,
        updatedAt,
      });
      res.json(comment);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new CommentController();
