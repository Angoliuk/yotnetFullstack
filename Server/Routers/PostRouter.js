import { Router } from "express";
import PostController from "../Controllers/PostController.js";
import { PATHS } from "../config.js";

const PostRouter = new Router();

PostRouter.get(PATHS.getPosts, PostController.getAll);
PostRouter.get(PATHS.getPost, PostController.getOne);
PostRouter.delete(PATHS.deletePost, PostController.delete);
PostRouter.patch(PATHS.updatePost, PostController.update);
PostRouter.post(PATHS.createPost, PostController.create);

export default PostRouter;
