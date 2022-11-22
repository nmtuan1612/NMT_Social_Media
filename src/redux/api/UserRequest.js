import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((request) => {
  const profile = JSON.parse(localStorage.getItem("profile"));

  if (profile) {
    request.headers.Authorization = `Bearer ${profile.token}`;
  }
  return request;
});

export const getUser = (userId) => API.get(`/user/${userId}`);

export const updateUser = (id, formData) => API.put(`/user/${id}`, formData);

export const getAllUsers = (listIds) => API.post("/user/", { listIds: listIds });

export const followUser = (id, data) => API.put(`/user/${id}/follow`, data);

export const unFollowUser = (id, data) => API.put(`/user/${id}/unfollow`, data);

export const createNotification = (notiData) => API.post("/notify", notiData);

export const deleteNotification = (notiData) => API.put(`/notify/delete`, notiData);

export const getNotifications = (userId) => API.get(`/notify/${userId}`);

export const getSearchResults = (id, params) => API.get(`/user/${id}/explore`, { params });
