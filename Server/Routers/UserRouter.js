import { Router } from "express";
import UserController from "../Controllers/UserController.js";
import { PATHS } from "../config.js";

const UserRouter = new Router();

UserRouter.get(PATHS.getUser, UserController.getOne);
UserRouter.get(PATHS.getUsers, UserController.getAll);
UserRouter.patch(PATHS.updateUser, UserController.update);

export default UserRouter;
