import { Router } from "express";
import CommentController from "../Controllers/CommentController.js";
import { PATHS } from "../config.js";
import ValidationMiddleware from "../Middlewares/Validation/ValidationMiddleware.js";
import AccessMiddleware from "../Middlewares/AccessMiddleware.js";

const CommentRouter = new Router();

CommentRouter.get(PATHS.getComments, CommentController.getAll);
CommentRouter.get(PATHS.getComment, CommentController.getOne);
CommentRouter.delete(
  PATHS.deleteComment,
  [AccessMiddleware],
  CommentController.delete
);
CommentRouter.patch(
  PATHS.updateComment,
  [ValidationMiddleware, AccessMiddleware],
  CommentController.update
);
CommentRouter.post(
  PATHS.createComment,
  [ValidationMiddleware, AccessMiddleware],
  CommentController.create
);

export default CommentRouter;
