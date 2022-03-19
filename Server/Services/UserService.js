import { QueryFilter } from "../Helpers/QueryFilter.js";
import UserModel from "../Models/UserModel.js";

class UserService {
  async update(user, userId) {
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      user,
      { new: true }
    );
    return updatedUser;
  }
  async getUserUploads(userId) {
    const uploads = await UserModel.findOne({ _id: userId }).select("uploads");
    return uploads;
  }
  async updateUserUploads(userId, uploads) {
    await UserModel.findOneAndUpdate({ _id: userId }, { $set: { uploads } });
  }
  async getOne(userId) {
    if (!userId) {
      throw new Error("get one");
    }
    const users = await UserModel.findOne({ _id: userId });
    return users;
  }
  async getAll(query) {
    const users = await QueryFilter(UserModel, query);
    return users;
  }
}

export default new UserService();
