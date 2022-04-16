export class CommentDTO {
  id;
  body;
  userId;
  postId;
  createdAt;
  updatedAt;

  constructor(model) {
    this.id = model._id;
    this.body = model.body;
    this.userId = model.userId;
    this.userId = model.postId;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    if (model?.expanded) {
      this.expanded = model.expanded;
    }
  }
}
