import axios from "axios";

// const API = axios.create({ baseURL: 'https://nmt-social-media.herokuapp.com' });
const API = axios.create({ baseURL: 'https://nmt-social-media-app.onrender.com' });

export const login = (formData) => API.post('auth/login', formData);
export const signup = (formData) => API.post('auth/register', formData);