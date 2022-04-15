import { QueryFilter } from "../Helpers/QueryFilter.js";
import {
  DeleteFromUserUploads,
  AddToUserUploads,
} from "../Helpers/userUploads.js";
import AnnouncementModel from "../Models/AnnouncementModel.js";
import { DeleteFiles } from "../Helpers/DeleteFiles.js";
import { logger } from "../Logs/Logger.js";
import { AnnouncementDTO } from "../DTO/AnnouncementDTO.js";

class AnnouncementService {
  async update(announcementId, announcementData) {
    const announcement = await AnnouncementModel.findByIdAndUpdate(
      announcementId,
      announcementData,
      { new: true }
    );
    const announcementDTO = new AnnouncementDTO(announcement);
    logger.info("AnnouncementService update done");
    return announcementDTO;
  }

  async getAll(query) {
    const announcements = await QueryFilter(AnnouncementModel, query);
    const announcementsDTO = announcements.map(
      (announcement) => new AnnouncementDTO(announcement)
    );
    logger.info("AnnouncementService getAll done");
    return announcementsDTO;
  }

  async getOne(announcementId) {
    const announcement = await AnnouncementModel.findById(announcementId);
    const announcementDTO = new AnnouncementDTO(announcement);
    logger.info("AnnouncementService getOne done");
    return announcementDTO;
  }

  async delete(announcementId, userId) {
    const announcementToDelete = await AnnouncementModel.findById(
      announcementId
    );
    DeleteFiles(announcementToDelete.photos);
    await AnnouncementModel.findByIdAndDelete(announcementId);
    await DeleteFromUserUploads(userId, announcementId);
    logger.info("AnnouncementService delete done");
  }

  async create(announcementData, userId) {
    const announcement = await AnnouncementModel.create(announcementData);
    await AddToUserUploads(userId, announcement._id);
    const announcementDTO = new AnnouncementDTO(announcement);
    logger.info("AnnouncementService create done");
    return announcementDTO;
  }
}

export default new AnnouncementService();
