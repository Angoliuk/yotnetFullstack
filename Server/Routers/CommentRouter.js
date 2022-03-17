import { Router } from "express";
import CommentController from "../Controllers/CommentController.js";
import { PATHS } from "../config.js";

const CommentRouter = new Router();

CommentRouter.get(PATHS.getComments, CommentController.getAll);
CommentRouter.get(PATHS.getComment, CommentController.getOne);
CommentRouter.delete(PATHS.deleteComment, CommentController.delete);
CommentRouter.patch(PATHS.updateComment, CommentController.update);
CommentRouter.post(PATHS.createComment, CommentController.create);

export default CommentRouter;
