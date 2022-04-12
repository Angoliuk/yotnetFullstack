import { QueryFilter } from "../Helpers/QueryFilter.js";
import {
  DeleteFromUserUploads,
  AddToUserUploads,
} from "../Helpers/userUploads.js";
import AnnouncementModel from "../Models/AnnouncementModel.js";
import { DeleteFiles } from "../Helpers/DeleteFiles.js";
import { logger } from "../Logs/Logger.js";

class AnnouncementService {
  async update(announcementId, announcementData) {
    const announcement = await AnnouncementModel.findOneAndUpdate(
      { _id: announcementId },
      announcementData,
      { new: true }
    );
    logger.info("AnnouncementService update done");
    return announcement;
  }
  async getAll(query) {
    const announcements = await QueryFilter(AnnouncementModel, query);
    logger.info("AnnouncementService getAll done");
    return announcements;
  }
  async getOne(announcementId) {
    if (!announcementId) {
      throw new Error("get one");
    }
    const announcements = await AnnouncementModel.findOne({
      _id: announcementId,
    });
    logger.info("AnnouncementService getOne done");
    return announcements;
  }
  async delete(announcementId, userId) {
    const announcementToDelete = await AnnouncementModel.findById({
      _id: announcementId,
    });
    DeleteFiles(announcementToDelete.photos);
    await AnnouncementModel.findOneAndDelete({ _id: announcementId });
    await DeleteFromUserUploads(userId, announcementId);
    logger.info("AnnouncementService delete done");
  }
  async create(announcementData, userId) {
    const announcement = await AnnouncementModel.create(announcementData);
    await AddToUserUploads(userId, announcement._id);
    logger.info("AnnouncementService create done");
    return announcement;
  }
}

export default new AnnouncementService();
