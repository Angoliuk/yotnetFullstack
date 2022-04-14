import { logger } from "../Logs/Logger.js";
import AuthService from "../Services/AuthService.js";

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await AuthService.login(email, password);
      logger.info(`AuthController login done`);
      return res.json(user);
    } catch (e) {
      logger.error(`AuthController login. ${e.message}`);
      res.status(500).json([e.message]);
    }
  }

  async register(req, res) {
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
      logger.error(`AuthController register done`);
      return res.json(user);
    } catch (e) {
      logger.error(`AuthController register. ${e.message}`);
      res.status(500).json([e.message]);
    }
  }
}

export default new AuthController();
