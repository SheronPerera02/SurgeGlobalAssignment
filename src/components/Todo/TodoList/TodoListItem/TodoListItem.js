import React from "react";
import classes from "./TodoListItem.module.css";
import { MdPendingActions, MdOutlineDone } from "react-icons/md";
import { VscDebugStart } from "react-icons/vsc";
import { status } from "../../../../shared/utility";

const TodoListItem = ({ title, statusCode, click }) => {
  let displayIcon;
  let toggleButtonText;

  switch (status[statusCode]) {
    case status[1]:
      displayIcon = <VscDebugStart size={40} color="#ff3841" />;
      toggleButtonText = "Start";
      break;
    case status[2]:
      displayIcon = <MdPendingActions size={40} color="#ff3841" />;
      toggleButtonText = "Done";
      break;
    case status[3]:
      displayIcon = <MdOutlineDone size={40} color="#ff3841" />;
      toggleButtonText = "Delete";
      break;
    default:
      displayIcon = null;
  }

  return (
    <div className={classes.TodoListItem}>
      <div>
        <div>{displayIcon}</div>
        <div className={classes.DetailContainer}>
          <p>{title}</p>
          <strong>{status[statusCode]}</strong>
        </div>
      </div>
      <div>
        <button className={classes.ToggleButton} onClick={() => click()}>
          {toggleButtonText}
        </button>
      </div>
    </div>
  );
};

export default TodoListItem;
