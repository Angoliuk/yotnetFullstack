import UserService from "../Services/UserService.js";

class UserController {
  async getOne(req, res) {
    try {
      const users = await UserService.getOne(req.params.id);
      return res.json(users);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getAll(req, res) {
    try {
      const users = await UserService.getAll(req.query);
      return res.json(users);
    } catch (e) {
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
      return res.json(updatedUser);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new UserController();
