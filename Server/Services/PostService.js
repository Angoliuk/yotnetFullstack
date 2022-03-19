import PostModel from "../Models/PostModel.js";
import { QueryFilter } from "../Helpers/QueryFilter.js";
import {
  AddToUserUploads,
  DeleteFromUserUploads,
} from "../Helpers/userUploads.js";

class PostService {
  async update(postId, postData) {
    const post = await PostModel.findOneAndUpdate({ _id: postId }, postData, {
      new: true,
    });
    return post;
  }
  async getAll(query) {
    const posts = await QueryFilter(PostModel, query);
    return posts;
  }
  async getOne(postId) {
    if (!postId) {
      throw new Error("get one");
    }
    const post = await PostModel.findOne({ _id: postId });
    return post;
  }
  async delete(postId, userId) {
    await PostModel.findOneAndDelete({ _id: postId });
    console.log("working with uploads");
    await DeleteFromUserUploads(userId, postId);
  }
  async create(postData, userId) {
    const post = await PostModel.create(postData);
    await AddToUserUploads(userId, post._id);
    return post;
  }
}

export default new PostService();
