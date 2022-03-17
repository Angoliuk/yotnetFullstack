import { combineReducers } from "redux";
import { userReducers } from "./reducers/userReducers";
import { postReducers } from "./reducers/postReducers";
import { announcementReducers } from "./reducers/announcementReducers";

export default combineReducers({
  userReducers,
  postReducers,
  announcementReducers,
});
