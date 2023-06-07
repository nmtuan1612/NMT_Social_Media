const initState = {
  commentData: [],
  currentPostId: null,
  loading: false,
  creating: false,
  updating: false,
  error: false
};

const commentReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_START":
      return { ...state, creating: true };
    case "CREATE_COMMENT":
      return { ...state, commentData: [action.payload, ...state.commentData] };
    case "CREATE_FAIL":
      return { ...state, creating: false, error: true };

    case "GET_COMMENT_START":
      return { ...state, loading: true };
    case "GET_COMMENT":
      const newCommentList = action.payload.commentData?.filter(
        (cmt, index, self) => index === self.findLastIndex((t) => t._id === cmt._id)
      );
      return { ...state, commentData: newCommentList, currentPostId: action.payload.currentPostId, loading: false };

    case "LIKE_COMMENT":
      const likedIdx = state.commentData.findIndex((cmt) => cmt._id === action.payload._id);
      state.commentData[likedIdx].likes = action.payload.likes;
      return { ...state, commentData: [...state.commentData] };
    default:
      return state;
  }
};

export default commentReducer;
