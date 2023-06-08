import axios from "axios";

// const API = axios.create({ baseURL: "https://nmt-social-media.herokuapp.com" });
const API = axios.create({ baseURL: "https://nmt-social-media-app.onrender.com" });
// const API = axios.create({ baseURL: "http://localhost:5000/" });
API.interceptors.request.use((request) => {
  const profile = JSON.parse(localStorage.getItem("profile"));

  if (profile) {
    request.headers.Authorization = `Bearer ${profile.token}`;
  }
  return request;
});

export const createConversation = (conversationData) => API.post("/conversation", conversationData);
export const getAllConversationsOfUser = (userId) => API.get(`/conversation/${userId}`);
export const getAllMessageOfChat = (chatID) => API.get(`/conversation/message/${chatID}`);
