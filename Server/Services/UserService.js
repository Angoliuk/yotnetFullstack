import { UserDTO } from "../DTO/UserDTO.js";
import { QueryFilter } from "../Helpers/QueryFilter.js";
import {
  DeleteUserAnnouncements,
  DeleteUserComments,
  DeleteUserPosts,
} from "../Helpers/userUploads.js";
import { logger } from "../Logs/Logger.js";
import UserModel from "../Models/UserModel.js";

class UserService {
  async update(user, userId) {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, user, {
      new: true,
    });
    const userDTO = new UserDTO(updatedUser);
    logger.info("UserService update done");
    return userDTO;
  }

  async getUserUploads(userId) {
    const uploads = await UserModel.findById(userId).select("uploads");
    logger.info("UserService getUserUploads done");
    return uploads;
  }

  async updateUserUploads(userId, uploads) {
    await UserModel.findByIdAndUpdate(userId, { $set: { uploads } });
    logger.info("UserService UserUploads done");
  }

  async getOne(userId) {
    const user = await UserModel.findById(userId);
    const userDTO = new UserDTO(user);
    logger.info("UserService getOne done");
    return userDTO;
  }

  async getAll(query) {
    const users = await QueryFilter(UserModel, query);
    const usersDTO = users.map((user) => new UserDTO(user));
    logger.info("UserService getAll done");
    return usersDTO;
  }

  async delete(userId) {
    await DeleteUserComments(userId);
    await DeleteUserAnnouncements(userId);
    await DeleteUserPosts(userId);
    await UserModel.findByIdAndDelete(userId);
    logger.info("UserService delete done");
  }
}

export default new UserService();
