const initState = {
  notifications: [],
  loading: false,
  error: false,
};

export const notificationReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_NOTIFICATION":
      return { ...state, notifications: [...state.notifications, action.payload] };
    case "GET_NOTIFICATIONS": 
      return { ...state, notifications: action.payload };
    default:
      return state;
  }
};

export default notificationReducer;