import PostModel from "../Models/PostModel.js";
import { QueryFilter } from "../Helpers/QueryFilter.js";
import {
  AddToUserUploads,
  DeleteFromUserUploads,
  DeletePostComments,
} from "../Helpers/userUploads.js";
import { DeleteFiles } from "../Helpers/DeleteFiles.js";
import { logger } from "../Logs/Logger.js";

class PostService {
  async update(postId, postData) {
    const post = await PostModel.findOneAndUpdate({ _id: postId }, postData, {
      new: true,
    });
    logger.info("PostService update done");
    return post;
  }
  async getAll(query) {
    const posts = await QueryFilter(PostModel, query);
    logger.info("PostService getAll done");
    return posts;
  }
  async getOne(postId) {
    if (!postId) {
      throw new Error("get one");
    }
    const post = await PostModel.findOne({ _id: postId });
    logger.info("PostService getOne done");
    return post;
  }
  async delete(postId, userId) {
    const postToDelete = await PostModel.findById({ _id: postId });
    DeleteFiles(postToDelete.photos);
    await DeletePostComments(postId);
    await PostModel.findOneAndDelete({ _id: postId });
    await DeleteFromUserUploads(userId, postId);
    logger.info("PostService delete done");
  }
  async create(postData, userId) {
    const post = await PostModel.create(postData);
    await AddToUserUploads(userId, post._id);
    logger.info("PostService create done");
    return post;
  }
}

export default new PostService();
