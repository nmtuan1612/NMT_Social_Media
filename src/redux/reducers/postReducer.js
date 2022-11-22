const initState = {
  posts: [],
  savedPosts: [],
  uploading: false,
  loading: false,
  error: false,
};

export const postReducer = (state = initState, action) => {
  switch (action.type) {
    case "UPLOAD_START":
      return { ...state, uploading: true, loading: true, error: false };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        uploading: false,
        loading: false,
        error: false,
      };
    case "UPLOAD_FAIL":
      return { ...state, uploading: false, error: true };

    case "UPDATE_START":
      return { ...state, loading: true, error: false };
    case "UPDATE_SUCCESS":
      const updateIndex = state.posts.findIndex(post => post._id = action.payload._id);
      state.posts[updateIndex] = action.payload;
      return { ...state, loading: false, error: false };
    case "UPDATE_FAIL":
      return { ...state, loading: false, error: true };

    case "LIKE_POST":
      const postLikeIdx = state.posts.findIndex(post => post._id = action.payload._id);
      state.posts[postLikeIdx] = action.payload;
      return { ...state };

    case "HIDE_POST":
      const hideIndex = state.posts.findIndex(post => post._id = action.payload._id);
      state.posts[hideIndex] = action.payload;
      return { ...state };

    case "SAVED_POST":
      return { ...state, savedPosts: [...state.savedPosts, action.payload] };

    case "DELETE_POST": 
      return { ...state, posts: [...state.posts.filter(post => post._id !== action.payload._id)] };

    case "GET_USER_POSTS":
      return { ...state, posts: [...action.payload]};

    case "GET_SAVED_POSTS":
      return { ...state, savedPosts: action.payload };

    case "RETRIEVE_START":
      return { ...state, uploading: false, loading: true, error: false };
    case "RETRIEVE_SUCCESS":
      return { ...state, posts: [...action.payload], uploading: false, loading: false, error: false };
    case "RETRIEVE_FAIL":
      return { ...state, uploading: false, loading: false, error: true };
    default:
      return state;
  }
};

export default postReducer;
