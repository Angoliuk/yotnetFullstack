export const POST_PHOTOS_LIMIT = 10;
export const ANNOUNCEMENT_PHOTOS_LIMIT = 2;

export const PATHS = {
  login: "/login",
  logout: "/logout",
  register: "/register",
  refresh: "/refresh",

  getUser: "/:id",
  getUsers: "/",
  updateUser: "/:id",
  deleteUser: "/:id",

  getPost: "/:id",
  getPosts: "/",
  deletePost: "/:id",
  updatePost: "/:id",
  createPost: "/",

  getAnnouncements: "/",
  getAnnouncement: "/:id",
  deleteAnnouncement: "/:id",
  updateAnnouncement: "/:id",
  createAnnouncement: "/",

  getComments: "/",
  getComment: "/:id",
  deleteComment: "/:id",
  updateComment: "/:id",
  createComment: "/",
};
