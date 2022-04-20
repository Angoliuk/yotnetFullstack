import { Router } from "express";
import PostController from "../Controllers/PostController.js";
import { PATHS, POST_PHOTOS_LIMIT } from "../config.js";
import FilesMiddleware from "../Middlewares/FilesMiddleware.js";
import ValidationMiddleware from "../Middlewares/Validation/ValidationMiddleware.js";
import OwnerMiddleware from "../Middlewares/OwnerMiddleware.js";
import AuthMiddleware from "../Middlewares/AuthMiddleware.js";

const PostRouter = new Router();
PostRouter.get(PATHS.getPosts, PostController.getAll);
PostRouter.get(PATHS.getPost, PostController.getOne);
PostRouter.delete(PATHS.deletePost, OwnerMiddleware, PostController.delete);
PostRouter.patch(
  PATHS.updatePost,
  [
    FilesMiddleware.array("photos", POST_PHOTOS_LIMIT),
    ValidationMiddleware,
    OwnerMiddleware,
  ],
  PostController.update
);
PostRouter.post(
  PATHS.createPost,
  [
    FilesMiddleware.array("photos", POST_PHOTOS_LIMIT),
    ValidationMiddleware,
    AuthMiddleware,
  ],
  PostController.create
);

export default PostRouter;
