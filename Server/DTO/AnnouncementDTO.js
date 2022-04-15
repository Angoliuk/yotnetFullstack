export class AnnouncementDTO {
  id;
  title;
  body;
  userId;
  createdAt;
  updatedAt;
  photos;

  constructor(model) {
    this.id = model._id;
    this.title = model.title;
    this.body = model.body;
    this.userId = model.userId;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.photos = model.photos;
  }
}
