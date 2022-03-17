export const PORT = 5000;

export const DB_URL =
  "mongodb+srv://admin:admin@cluster0.xmujb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

export const SECRET = "Soi-hn&D#%v209Fsv7n=a,(d+Gs)&s^hSd#";

export const SALT = 10;

export const PATHS = {
  getUser: "/user/:id",
  getUsers: "/users",
  updateUser: "/users/:id",

  getPost: "/post/:id",
  getPosts: "/posts",
  deletePost: "/posts/:id",
  updatePost: "/posts/:id",
  createPost: "/posts",

  getAnnouncements: "/announcements",
  getAnnouncement: "/announcement/:id",
  deleteAnnouncement: "/announcements/:id",
  updateAnnouncement: "/announcements/:id",
  createAnnouncement: "/announcements",

  getComments: "/comments",
  getComment: "/comment/:id",
  deleteComment: "/comments/:id",
  updateComment: "/comments/:id",
  createComment: "/comments",
};
