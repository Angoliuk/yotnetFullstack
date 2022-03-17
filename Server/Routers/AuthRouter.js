import { Router } from "express";
import AuthController from "../Controllers/AuthController.js";

const AuthRouter = new Router();

AuthRouter.post("/login", AuthController.login);
AuthRouter.post("/register", AuthController.register);

export default AuthRouter;
