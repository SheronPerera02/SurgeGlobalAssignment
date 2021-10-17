import React from "react";
import classes from "./Todo.module.css";
import { IoMdAddCircleOutline } from "react-icons/io";
import TodoList from "./TodoList/TodoList";
import AddTodo from "./AddTodo/AddTodo";
import Backdrop from "../UI/Backdrop/Backdrop";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

const Todo = (props) => {
  const [addActive, setAddActive] = React.useState(false);

  const [viewDone, setViewDone] = React.useState(false);

  const onUpdateTodoHander = (index, statusCode) => {
    props.onUpdateTodo(index, statusCode);
  };

  const onDeleteHandler = (id) => {
    props.onDeleteTodo(id);
  };

  const totalTodos = props.todos.length;

  const completedTodos = props.todos.reduce((cv, el) => {
    return el.statusCode === 3 ? cv + 1 : cv;
  }, 0);

  return (
    <div className={classes.ParentContainer}>
      <div className={classes.Container}>
        <div className={classes.Controls}>
          <div>
            <button
              className={classes.Button}
              onClick={() => setViewDone(!viewDone)}
            >
              {viewDone ? "Todo" : "Completed"}
            </button>
            <button
              className={classes.Button}
              onClick={() => setAddActive(true)}
            >
              Add
              <IoMdAddCircleOutline size={22} />
            </button>
          </div>
          <div>
            {viewDone ? (
              <p className={classes.Count}>Completed</p>
            ) : (
              <p className={classes.Count}>
                {completedTodos}/{totalTodos}
              </p>
            )}
          </div>
        </div>
        <TodoList
          todos={props.todos}
          onUpdateTodo={onUpdateTodoHander}
          onDeleteTodo={onDeleteHandler}
          viewDone={viewDone}
        />
      </div>
      {addActive ? <Backdrop clicked={() => setAddActive(false)} /> : null}
      <AddTodo
        active={addActive}
        clicked={() => setAddActive(false)}
        todos={props.todos}
        viewDone={() => setViewDone(false)}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    todos: state.todo.todos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateTodo: (index, statusCode) =>
      dispatch(actions.updateTodo(index, statusCode)),
    onDeleteTodo: (id) => dispatch(actions.deleteTodo(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
