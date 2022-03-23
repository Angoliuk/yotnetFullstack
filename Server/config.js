export const PORT = 5000;

export const DB_URL =
  "mongodb+srv://admin:admin@cluster0.xmujb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

export const SECRET = "Soi-hn&D#%v209Fsv7n=a,(d+Gs)&s^hSd#";

export const SALT = 10;

export const POST_PHOTOS_LIMIT = 10;
export const ANNOUNCEMENT_PHOTOS_LIMIT = 2;

export const PATHS = {
  login: "/:access/login",
  register: "/:access/register",

  getUser: "/:access/:id",
  getUsers: "/:access",
  updateUser: "/:access/:id",

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
