import AuthService from "../Services/AuthService.js";

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await AuthService.login(email, password);
      return res.json(user);
    } catch (e) {
      res.status(400).json(e);
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
      });
      return res.json(user);
    } catch (e) {
      res.status(400).json(e);
    }
  }
}

export default new AuthController();
