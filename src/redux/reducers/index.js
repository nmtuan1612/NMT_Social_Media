import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import commentReducer from "./commentReducer";
import notificationReducer from "./notificationReducer";
import appReducer from "./appReducer";

export const reducers = combineReducers({
  appReducer,
  authReducer,
  commentReducer,
  notificationReducer,
  postReducer,
});
