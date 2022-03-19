export const PORT = 5000;

export const DB_URL =
  "mongodb+srv://admin:admin@cluster0.xmujb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

export const SECRET = "Soi-hn&D#%v209Fsv7n=a,(d+Gs)&s^hSd#";

export const SALT = 10;

export const PATHS = {
  getUser: "/:id",
  getUsers: "",
  updateUser: "/:id",

  getPost: "/:id",
  getPosts: "",
  deletePost: "/:id",
  updatePost: "/:id",
  createPost: "",

  getAnnouncements: "",
  getAnnouncement: "/:id",
  deleteAnnouncement: "/:id",
  updateAnnouncement: "/:id",
  createAnnouncement: "",

  getComments: "",
  getComment: "/:id",
  deleteComment: "/:id",
  updateComment: "/:id",
  createComment: "",
};
