import PostModel from "../Models/PostModel.js";
import { QueryFilter } from "../Helpers/QueryFilter.js";

class PostService {
  async update(_id, postData) {
    const post = await PostModel.findOneAndUpdate({ _id }, postData, {
      new: true,
    });
    return post;
  }
  async getAll(query) {
    const posts = await QueryFilter(PostModel, query);
    return posts;
  }
  async getOne(_id) {
    if (!_id) {
      throw new Error("get one");
    }
    const post = await PostModel.findOne({ _id });
    return post;
  }
  async delete(_id) {
    const post = await PostModel.findOneAndDelete({ _id });
    return post;
  }
  async create(postData) {
    const post = await PostModel.create(postData);
    return post;
  }
}

export default new PostService();
