import { UserApi } from "../api";

export const updateUser = (id, formData) => async (dispatch) => {
  dispatch({ type: "UPDATING_START" });
  try {
    const { data } = await UserApi.updateUser(id, formData);
    dispatch({ type: "UPDATING_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "UPDATING_FAIL" });
  }
};

export const followUser = (id, data) => async (dispatch) => {
  await UserApi.followUser(id, data);
  dispatch({ type: "FOLLOW_USER", payload: id });
};

export const unFollowUser = (id, data) => async (dispatch) => {
  await UserApi.unFollowUser(id, data);
  dispatch({ type: "UNFOLLOW_USER", payload: id });
};

export const createNotification = (notiData) => async (dispatch) => {
  await UserApi.createNotification(notiData);
  // dispatch({ type: "CREATE_NOTIFICATION", payload: notification.data });
};
export const deleteNotification = (notiData) => async (dispatch) => {
  const noti = await UserApi.deleteNotification(notiData);
  console.log(noti);
};

export const getNotifications = (userId) => async (dispatch) => {
  const notifications = await UserApi.getNotifications(userId);
  dispatch({ type: "GET_NOTIFICATIONS", payload: notifications.data });
};
