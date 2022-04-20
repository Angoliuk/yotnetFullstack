import { logger } from "../Logs/Logger.js";
import TokenService from "../Services/TokenService.js";
import UserService from "../Services/UserService.js";

class UserController {
  async getOne(req, res, next) {
    try {
      const users = await UserService.getOne(req.params.id);
      logger.info("UserController getOne done");
      return res.json(users);
    } catch (e) {
      logger.error(`UserController getOne. ${e.message}`);
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const users = await UserService.getAll(req.query);
      logger.info("UserController getAll done");
      return res.json(users);
    } catch (e) {
      logger.error(`UserController getAll. ${e.message}`);
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      await UserService.delete(req.params.id);
      await TokenService.removeToken(refreshToken);
      logger.info("UserController delete done");
      return res.sendStatus(200);
    } catch (e) {
      logger.error(`UserController delete. ${e.message}`);
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { email, password, firstname, lastname, avatar, age } = req.body;
      const updatedUser = await UserService.update(
        {
          email,
          password,
          firstname,
          lastname,
          avatar,
          age,
        },
        req.userId
      );
      logger.info("UserController update done");
      return res.json(updatedUser);
    } catch (e) {
      logger.error(`UserController update. ${e.message}`);
      next(e);
    }
  }
}

export default new UserController();
