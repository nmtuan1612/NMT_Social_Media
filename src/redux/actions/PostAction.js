import { PostApi } from "../api";

export const deletePost = (postId, userId) => async (dispatch) => {
  try {
    const post = await PostApi.deletePost(postId, userId);
    dispatch({ type: "DELETE_POST", payload: post.data });
  } catch (error) {
    console.log(error);
  }
};

export const savedPost = (postId, userId) => async (dispatch) => {
  try {
    const savedPost = await PostApi.savePost(postId, userId);
    dispatch({ type: "SAVED_POST", payload: savedPost.data });
  } catch (error) {
    console.log(error);
  }
};

export const hidePost = (postId, userId) => async (dispatch) => {
  try {
    const post = await PostApi.hidePost(postId, userId);
    dispatch({ type: "HIDE_POST", payload: post.data });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (postId, userId) => async (dispatch) => {
  try {
    const post = await PostApi.likePost(postId, userId);
    dispatch({ type: "LIKE_POST", payload: post.data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (postData) => async (dispatch) => {
  dispatch({ type: "UPDATE_START" });
  try {
    const post = await PostApi.updatePost(postData);
    dispatch({ type: "UPDATE_SUCCESS", payload: post.data });
  } catch (error) {
    dispatch({ type: "UPDATE_FAIL" });
    console.log(error);
  }
};

export const getUserPosts = (userProfileId, userId) => async (dispatch) => {
  try {
    const posts = await PostApi.getUserPosts(userProfileId, userId);
    dispatch({ type: "GET_USER_POSTS", payload: posts.data });
  } catch (error) {
    console.log(error);
  }
};

export const getSavedPost = (userId) => async (dispatch) => {
  try {
    const savedPosts = await PostApi.getSavedPosts(userId);
    dispatch({ type: "GET_SAVED_POSTS", payload: savedPosts.data });
  } catch (error) {
    console.log(error);
  }
};

export const getTimelinePosts = (userId) => async (dispatch) => {
  dispatch({ type: "RETRIEVE_START" });
  try {
    const posts = await PostApi.getTimelinePosts(userId);
    dispatch({ type: "RETRIEVE_SUCCESS", payload: posts.data });
  } catch (error) {
    dispatch({ type: "RETRIEVE_FAIL" });
    console.log(error);
  }
};

export const commentToPost = (comment) => async (dispatch) => {
  dispatch({ type: "CREATE_START" });
  try {
    const result = await PostApi.commentPost(comment);
    dispatch({ type: "CREATE_COMMENT", payload: result.data });
  } catch (error) {
    dispatch({ type: "CREATE_FAIL" });
    console.log(error);
  }
};

export const getPostComments = (postId) => async (dispatch) => {
  dispatch({ type: "GET_COMMENT_START" });
  
  try {
    const comments = await PostApi.getPostComments(postId);
    dispatch({ type: "GET_COMMENT", payload: comments.data });
  } catch (error) {
    console.log(error);
  }
};

export const likePostComment = (commentId, userId) => async (dispatch) => {
  try {
    const comment = await PostApi.likePostComment(commentId, userId);
    dispatch({ type: "LIKE_COMMENT", payload: comment.data });
  } catch (error) {
      console.log(error);
  }
}