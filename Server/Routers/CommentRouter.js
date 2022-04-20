import { Router } from "express";
import CommentController from "../Controllers/CommentController.js";
import { PATHS } from "../config.js";
import ValidationMiddleware from "../Middlewares/Validation/ValidationMiddleware.js";
import OwnerMiddleware from "../Middlewares/OwnerMiddleware.js";
import AuthMiddleware from "../Middlewares/AuthMiddleware.js";

const CommentRouter = new Router();

CommentRouter.get(PATHS.getComments, CommentController.getAll);
CommentRouter.get(PATHS.getComment, CommentController.getOne);
CommentRouter.delete(
  PATHS.deleteComment,
  OwnerMiddleware,
  CommentController.delete
);
CommentRouter.patch(
  PATHS.updateComment,
  [ValidationMiddleware, OwnerMiddleware],
  CommentController.update
);
CommentRouter.post(
  PATHS.createComment,
  [ValidationMiddleware, AuthMiddleware],
  CommentController.create
);

export default CommentRouter;
