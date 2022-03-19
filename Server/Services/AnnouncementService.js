import { QueryFilter } from "../Helpers/QueryFilter.js";
import {
  DeleteFromUserUploads,
  AddToUserUploads,
} from "../Helpers/userUploads.js";
import AnnouncementModel from "../Models/AnnouncementModel.js";

class AnnouncementService {
  async update(announcementId, announcementData) {
    const announcement = await AnnouncementModel.findOneAndUpdate(
      { _id: announcementId },
      announcementData,
      { new: true }
    );
    return announcement;
  }
  async getAll(query) {
    const announcements = await QueryFilter(AnnouncementModel, query);
    return announcements;
  }
  async getOne(announcementId) {
    if (!announcementId) {
      throw new Error("get one");
    }
    const announcements = await AnnouncementModel.findOne({
      _id: announcementId,
    });
    return announcements;
  }
  async delete(announcementId, userId) {
    await AnnouncementModel.findOneAndDelete({ _id: announcementId });
    await DeleteFromUserUploads(userId, announcementId);
  }
  async create(announcementData, userId) {
    const announcement = await AnnouncementModel.create(announcementData);
    await AddToUserUploads(userId, announcement._id);
    return announcement;
  }
}

export default new AnnouncementService();
