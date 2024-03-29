import { logger } from "../Logs/Logger.js";
import AuthService from "../Services/AuthService.js";

class AuthController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await AuthService.login(email, password);
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      logger.info(`AuthController login done`);
      return res.json(user.data);
    } catch (e) {
      logger.error(`AuthController login. ${e.message}`);
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      await AuthService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }

  async register(req, res, next) {
    try {
      const { email, password, firstname, lastname, avatar, age } = req.body;
      const user = await AuthService.register({
        email,
        password,
        firstname,
        lastname,
        avatar,
        age,
        uploads: [],
      });
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      logger.info(`AuthController register done`);
      return res.json(user.data);
    } catch (e) {
      logger.error(`AuthController register. ${e.message}`);
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      console.log("cookies", req.cookies);
      const user = await AuthService.refresh(refreshToken);
      return res.json(user);
    } catch (e) {
      logger.error(`AuthController refresh. ${e.message}`);
      next(e);
    }
  }
}

export default new AuthController();
