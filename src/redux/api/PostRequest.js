import axios from "axios";

// const API = axios.create({ baseURL: "https://nmt-social-media.herokuapp.com" });
const API = axios.create({ baseURL: "https://nmt-social-media-app.onrender.com" });
// const API = axios.create({ baseURL: "http://localhost:5000" });
API.interceptors.request.use((request) => {
  const profile = JSON.parse(localStorage.getItem("profile"));

  if (profile) {
    request.headers.Authorization = `Bearer ${profile.token}`;
  }
  return request;
});

export const getPost = (postId) => API.get(`post/${postId}`);

export const uploadImage = (postData) => API.post("/upload", postData);

export const uploadPost = (postData) => API.post("/post", postData);

export const getUserPosts = (userProfileId, userId) => API.post(`/post/${userProfileId}/profile`, { userId: userId });

export const getTimelinePosts = (id) => API.get(`/post/${id}/timeline`);

export const likePost = (postId, userId) => API.put(`/post/${postId}/like`, { userId: userId });

export const savePost = (postId, userId) => API.put(`/post/${postId}/save`, { userId: userId });

export const getSavedPosts = (userId) => API.get(`/post/${userId}/get_saved`);

export const hidePost = (postId, userId) => API.put(`/post/${postId}/hide`, { userId: userId });

export const deletePost = (postId, userId) => API.put(`/post/${postId}/delete`, { userId: userId });

export const updatePost = (postData) => API.put(`/post/${postData._id}`, postData);

// Comment
export const getComment = (commentId) => API.get(`/comment/${commentId}`);

export const commentPost = (comment) => API.post("/comment", comment);

export const getPostComments = (postId) => API.get(`comment/post-comments/${postId}`);

export const likePostComment = (commentId, userId) => API.put(`/comment/like/${commentId}`, { userId: userId });
