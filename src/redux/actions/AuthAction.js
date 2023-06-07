import { AuthApi } from "../api";
import { toast } from "react-toastify";

export const logIn = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.login(formData);
    // setTimeout(() => {
    if (data?.user) {
      dispatch({ type: "AUTH_SUCCESS", payload: data });
      toast.success("Login successfully!", { autoClose: 1500 });
    } else {
      dispatch({ type: "AUTH_FAIL" });
    }
    // }, 2000);
  } catch (error) {
    toast.error(error.response.data);

    dispatch({ type: "AUTH_FAIL" });
  }
};

export const signUp = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.signup(formData);
    if (data?.user) {
      dispatch({ type: "AUTH_SUCCESS", payload: data });
      toast.success("Sign up successfully!", { autoClose: 1500 });
    } else {
      dispatch({ type: "AUTH_FAIL" });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAIL" });
  }
};

export const logOut = () => async (dispatch) => {
  dispatch({ type: "LOG_OUT" });
};
