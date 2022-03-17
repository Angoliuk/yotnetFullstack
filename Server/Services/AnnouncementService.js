import { QueryFilter } from "../Helpers/QueryFilter.js";
import AnnouncementModel from "../Models/AnnouncementModel.js";

class AnnouncementService {
  async update(_id, postData) {
    const announcement = await AnnouncementModel.findOneAndUpdate(
      { _id },
      postData,
      { new: true }
    );
    return announcement;
  }
  async getAll(query) {
    const announcements = await QueryFilter(AnnouncementModel, query);
    return announcements;
  }
  async getOne(_id) {
    if (!_id) {
      throw new Error("get one");
    }
    const announcements = await AnnouncementModel.findOne({ _id });
    return announcements;
  }
  async delete(_id) {
    const announcement = await AnnouncementModel.findOneAndDelete({ _id });
    return announcement;
  }
  async create(postData) {
    const announcement = await AnnouncementModel.create(postData);
    return announcement;
  }
}

export default new AnnouncementService();
