const initialState = {
  otherUserId: null,
  chatID: null,
  sizeState: "desktop"
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CONNECT_SOCKET":
      return { ...state, ...action.payload };
    case "RESIZE_VIEWPORT":
      return { ...state, sizeState: action.payload };
    default:
      return state;
  }
};

export default appReducer;
