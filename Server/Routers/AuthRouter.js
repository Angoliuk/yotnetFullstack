import { Router } from "express";
import { PATHS } from "../config.js";
import AuthController from "../Controllers/AuthController.js";
import FilesMiddleware from "../Middlewares/FilesMiddleware.js";
import ValidationMiddleware from "../Middlewares/Validation/ValidationMiddleware.js";

const AuthRouter = new Router();

AuthRouter.post(PATHS.login, AuthController.login);
AuthRouter.post(
  PATHS.register,
  [FilesMiddleware.single("avatar"), ValidationMiddleware],
  AuthController.register
);
AuthRouter.post(PATHS.logout, AuthController.logout);
AuthRouter.get(PATHS.refresh, AuthController.refresh);

export default AuthRouter;
