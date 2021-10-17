import React from "react";
import classes from "./AddTodo.module.css";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";

const AddTodo = ({ active, clicked, onSave, todos, viewDone }) => {
  const [title, setTitle] = React.useState("");

  const classNames = [classes.AddTodo];
  if (active) classNames.push(classes.Active);

  const onSaveHandler = () => {
    const id =
      todos.length > 0
        ? "T" + (todos[todos.length - 1].id.split("T")[1] + 1)
        : "T1";
    onSave(id, title);
    setTitle("");
    viewDone();
    clicked();
  };

  return (
    <div className={classNames.join(" ")}>
      <input
        placeholder="Title"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />
      <button onClick={onSaveHandler}>Save</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSave: (id, title) => dispatch(actions.addTodo(id, title)),
  };
};

export default connect(null, mapDispatchToProps)(AddTodo);
