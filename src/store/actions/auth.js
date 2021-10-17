import * as actionTypes from "./actionTypes";
import axios from "axios";

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const authSuccess = (email, token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    email,
    token,
  };
};

const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const authLogout = () => {
  localStorage.removeItem("surgeTodoCache");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const auth = (
  email,
  password,
  setSpinnerVisibility,
  showError,
) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("https://reqres.in/api/login", { email, password })
      .then((response) => {
        dispatch(authSuccess(email, response.data.token));
        localStorage.setItem(
          "surgeTodoCache",
          JSON.stringify({ token: response.data.token, email })
        );
      })
      .catch((error) => {
        let message = null;
        if (error.response) {
          message = "Invalid credentials";
        } else {
          message = "Check your internet connection";
        }
        dispatch(authFail(error));
        setSpinnerVisibility(false);
        showError(message);
      });
  };
};

export const tryAutoLogin = () => {
  return (dispatch) => {
    const objStr = localStorage.getItem("surgeTodoCache");
    if (objStr) {
      const obj = JSON.parse(objStr);
      dispatch(authSuccess(obj.email, obj.token));
    } else {
      dispatch(authLogout());
    }
  };
};
