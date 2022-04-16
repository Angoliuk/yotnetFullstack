import { Router } from "express";
import PostController from "../Controllers/PostController.js";
import { PATHS, POST_PHOTOS_LIMIT } from "../config.js";
import FilesMiddleware from "../Middlewares/FilesMiddleware.js";
import AccessMiddleware from "../Middlewares/AccessMiddleware.js";
import ValidationMiddleware from "../Middlewares/Validation/ValidationMiddleware.js";

const PostRouter = new Router();
console.log(1);
PostRouter.get(PATHS.getPosts, PostController.getAll);
PostRouter.get(PATHS.getPost, PostController.getOne);
console.log(1);
PostRouter.delete(PATHS.deletePost, [AccessMiddleware], PostController.delete);
PostRouter.patch(
  PATHS.updatePost,
  [
    FilesMiddleware.array("photos", POST_PHOTOS_LIMIT),
    ValidationMiddleware,
    AccessMiddleware,
  ],
  PostController.update
);
PostRouter.post(
  PATHS.createPost,
  [
    FilesMiddleware.array("photos", POST_PHOTOS_LIMIT),
    ValidationMiddleware,
    AccessMiddleware,
  ],

  PostController.create
);

export default PostRouter;
