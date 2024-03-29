import { Router } from "express";
import UserController from "../Controllers/UserController.js";
import { PATHS } from "../config.js";
import FilesMiddleware from "../Middlewares/FilesMiddleware.js";
import ValidationMiddleware from "../Middlewares/Validation/ValidationMiddleware.js";
import OwnerMiddleware from "../Middlewares/OwnerMiddleware.js";

const UserRouter = new Router();

UserRouter.get(PATHS.getUser, UserController.getOne);
UserRouter.get(PATHS.getUsers, UserController.getAll);
UserRouter.patch(
  PATHS.updateUser,
  [FilesMiddleware.array("avatar"), ValidationMiddleware, OwnerMiddleware],
  UserController.update
);
UserRouter.delete(PATHS.deleteUser, OwnerMiddleware, UserController.delete);

export default UserRouter;
