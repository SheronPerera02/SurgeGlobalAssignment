import React from "react";
import classes from "./Backdrop.module.css";

const Backdrop = ({ clicked }) => (
  <div className={classes.Backdrop} onClick={clicked}></div>
);

export default Backdrop;
