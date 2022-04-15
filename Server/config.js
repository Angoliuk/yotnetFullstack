export const POST_PHOTOS_LIMIT = 10;
export const ANNOUNCEMENT_PHOTOS_LIMIT = 2;

export const PATHS = {
  login: "/:access/login",
  logout: "/:access/logout",
  register: "/:access/register",

  getUser: "/:access/:id",
  getUsers: "/:access",
  updateUser: "/:access/:id",
  deleteUser: "/:access/:id",

  getPost: "/:access/:id",
  getPosts: "/:access",
  deletePost: "/:access/:id",
  updatePost: "/:access/:id",
  createPost: "/:access",

  getAnnouncements: "/:access",
  getAnnouncement: "/:access/:id",
  deleteAnnouncement: "/:access/:id",
  updateAnnouncement: "/:access/:id",
  createAnnouncement: "/:access",

  getComments: "/:access",
  getComment: "/:access/:id",
  deleteComment: "/:access/:id",
  updateComment: "/:access/:id",
  createComment: "/:access",
};
