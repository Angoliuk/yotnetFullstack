import { QueryFilter } from "../Helpers/QueryFilter.js";
import UserModel from "../Models/UserModel.js";

class UserService {
  async update(user) {
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: user._id },
      user,
      { new: true }
    );
    return updatedUser;
  }
  async getOne(_id) {
    if (!_id) {
      throw new Error("get one");
    }
    const users = await UserModel.findOne({ _id });
    return users;
  }
  async getAll(query) {
    const users = await QueryFilter(UserModel, query);
    return users;
  }
}

export default new UserService();
