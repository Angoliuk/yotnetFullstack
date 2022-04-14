import { logger } from "../Logs/Logger.js";
import UserService from "../Services/UserService.js";

class UserController {
  async getOne(req, res) {
    try {
      const users = await UserService.getOne(req.params.id);
      logger.info("UserController getOne done");
      return res.json(users);
    } catch (e) {
      logger.error(`UserController getOne. ${e.message}`);
      res.status(500).json(e);
    }
  }

  async getAll(req, res) {
    try {
      const users = await UserService.getAll(req.query);
      logger.info("UserController getAll done");
      return res.json(users);
    } catch (e) {
      logger.error(`UserController getAll. ${e.message}`);
      res.status(500).json(e);
    }
  }

  async delete(req, res) {
    try {
      await UserService.delete(req.params.id);
      logger.info("UserController delete done");
      return res.sendStatus(200);
    } catch (e) {
      logger.error(`UserController delete. ${e.message}`);
      res.status(500).json(e);
    }
  }

  async update(req, res) {
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
      res.status(500).json(e);
    }
  }
}

export default new UserController();
