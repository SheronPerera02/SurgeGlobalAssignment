import React from "react";
import classes from "./Header.module.css";
import * as actions from "../../store/actions";
import { connect } from "react-redux";

const Header = (props) => {
  return (
    <header className={classes.Header}>
      <h1>Surge Todo</h1>
      <button onClick={() => props.onAuthLogout()}>Logout</button>
    </header>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthLogout: () => dispatch(actions.authLogout()),
  };
};

export default connect(null, mapDispatchToProps)(Header);
