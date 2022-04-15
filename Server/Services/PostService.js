import PostModel from "../Models/PostModel.js";
import { QueryFilter } from "../Helpers/QueryFilter.js";
import {
  AddToUserUploads,
  DeleteFromUserUploads,
  DeletePostComments,
} from "../Helpers/userUploads.js";
import { DeleteFiles } from "../Helpers/DeleteFiles.js";
import { logger } from "../Logs/Logger.js";
import { PostDTO } from "../DTO/PostDTO.js";

class PostService {
  async update(postId, postData) {
    const post = await PostModel.findByIdAndUpdate(postId, postData, {
      new: true,
    });
    const postDTO = new PostDTO(post);
    logger.info("PostService update done");
    return postDTO;
  }

  async getAll(query) {
    const posts = await QueryFilter(PostModel, query);
    const postsDTO = posts.map((post) => new PostDTO(post));
    logger.info("PostService getAll done");
    return postsDTO;
  }

  async getOne(postId) {
    const post = await PostModel.findById(postId);
    const postDTO = new PostDTO(post);
    logger.info("PostService getOne done");
    return postDTO;
  }

  async delete(postId, userId) {
    const postToDelete = await PostModel.findById(postId);
    DeleteFiles(postToDelete.photos);
    await DeletePostComments(postId);
    await PostModel.findByIdAndDelete(postId);
    await DeleteFromUserUploads(userId, postId);
    logger.info("PostService delete done");
  }

  async create(postData, userId) {
    const post = await PostModel.create(postData);
    const postDTO = new PostDTO(post);
    await AddToUserUploads(userId, post._id);
    logger.info("PostService create done");
    return postDTO;
  }
}

export default new PostService();
