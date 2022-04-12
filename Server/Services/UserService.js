import { QueryFilter } from "../Helpers/QueryFilter.js";
import { logger } from "../Logs/Logger.js";
import UserModel from "../Models/UserModel.js";

class UserService {
  async update(user, userId) {
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      user,
      { new: true }
    );
    logger.info("UserService update done");
    return updatedUser;
  }
  async getUserUploads(userId) {
    const uploads = await UserModel.findOne({ _id: userId }).select("uploads");
    logger.info("UserService getUserUploads done");
    return uploads;
  }
  async updateUserUploads(userId, uploads) {
    await UserModel.findOneAndUpdate({ _id: userId }, { $set: { uploads } });
    logger.info("UserService UserUploads done");
  }
  async getOne(userId) {
    const users = await UserModel.findOne({ _id: userId });
    logger.info("UserService getOne done");
    return users;
  }
  async getAll(query) {
    const users = await QueryFilter(UserModel, query);
    logger.info("UserService getAll done");
    return users;
  }
}

export default new UserService();
