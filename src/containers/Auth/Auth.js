import React from "react";
import classes from "./Auth.module.css";
import profileImage from "../../assets/profile.png";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { ToastContainer, toast } from "react-toastify";

import {
  updateObject,
  checkValidity,
  checkFormValidity,
} from "../../shared/utility";

const Auth = (props) => {
  const [form, setForm] = React.useState({
    controls: {
      email: {
        placeholder: "Email",
        type: "email",
        value: "eve.holt@reqres.in",
        isValid: true,
        dirty: false,
        validation: {
          required: true,
          isEmail: true,
        },
      },
      password: {
        placeholder: "Password",
        type: "password",
        value: "cityslicka",
        isValid: true,
        dirty: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
    formIsValid: true,
  });
  const [spinnerVisible, setSpinnerVisibility] = React.useState(false);

  const onChangeHandler = (key, value) => {
    const updatedControls = updateObject(form.controls, {
      [key]: updateObject(form.controls[key], {
        value,
        isValid: checkValidity(value, form.controls[key].validation),
        dirty: true,
      }),
    });

    setForm(
      updateObject(form, {
        controls: updatedControls,
        formIsValid: checkFormValidity(updatedControls),
      })
    );
  };

  const onAuthHandler = () => {
    setSpinnerVisibility(true);
    props.onAuth(
      form.controls.email.value,
      form.controls.password.value,
      setSpinnerVisibility,
      showError
    );
  };

  const showError = (message) => {
    toast.error(message, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className={classes.Auth}>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ fontFamily: "inherit" }}
      />
      <div className={classes.Container}>
        <img src={profileImage} className={classes.ProfileImage} alt="" />
        {Object.keys(form.controls).map((key, index) => {
          return (
            <input
              className={
                !form.controls[key].isValid && form.controls[key].dirty
                  ? classes.Invalid
                  : null
              }
              placeholder={form.controls[key].placeholder}
              type={form.controls[key].placeholder}
              onChange={(event) => onChangeHandler(key, event.target.value)}
              value={form.controls[key].value}
              key={index}
            />
          );
        })}

        {spinnerVisible ? (
          <div className={classes.SpinnerContainer}>
            <span className={classes.Spinner}></span>
          </div>
        ) : (
          <button
            className={!form.formIsValid ? classes.InvalidForm : null}
            onClick={onAuthHandler}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, setSpinnerVisibility, showError) =>
      dispatch(actions.auth(email, password, setSpinnerVisibility, showError)),
  };
};

export default connect(null, mapDispatchToProps)(Auth);
