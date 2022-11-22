import { PostApi } from "../api";

export const uploadImage = (postData) => async (dispatch) => {
  try {
    await PostApi.uploadImage(postData);
  } catch (error) {
    console.log(error);
  }
};

export const uploadPost = (postData) => async (dispatch) => {
  dispatch({ type: "UPLOAD_START"})
  try {
    const newPost = await PostApi.uploadPost(postData);
    dispatch({ type: "UPLOAD_SUCCESS", payload: newPost.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOAD_FAIL" });
  }
};
