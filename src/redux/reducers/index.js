import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import commentReducer from "./commentReducer";
import notificationReducer from "./notificationReducer";

export const reducers = combineReducers({ authReducer, commentReducer, notificationReducer, postReducer });
