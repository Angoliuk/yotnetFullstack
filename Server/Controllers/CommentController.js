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
      const { body, createdAt, updatedAt, postId, userId } = req.body;
      const comment = await CommentService.update(req.params.id, {
        body,
        createdAt,
        updatedAt,
        postId,
        userId,
      });
      return res.json(comment);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async delete(req, res) {
    try {
      await CommentService.delete(req.params.id, req.userId);
      return res.sendStatus(200);
    } catch (e) {
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
      res.json(comment);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new CommentController();
