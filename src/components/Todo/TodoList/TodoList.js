import React from "react";
import classes from "./TodoList.module.css";
import TodoListItem from "./TodoListItem/TodoListItem";

const TodoList = (props) => {
  let filteredList = null;

  if (props.viewDone) {
    filteredList = props.todos.filter((todo) => todo.statusCode === 3);
  } else {
    filteredList = props.todos.filter((todo) => todo.statusCode !== 3);
  }

  return (
    <div className={classes.TodoList}>
      {filteredList.length > 0 ? (
        filteredList.map((todo) => {
          return (
            <TodoListItem
              key={todo.id}
              title={todo.title}
              statusCode={todo.statusCode}
              click={
                props.viewDone
                  ? () => props.onDeleteTodo(todo.id)
                  : () => props.onUpdateTodo(todo.id, todo.statusCode)
              }
            />
          );
        })
      ) : (
        <div className={classes.NoTodos}>
          <p>{props.viewDone ? "Nothing to show!" : "No todos!"}</p>
        </div>
      )}
    </div>
  );
};

export default TodoList;
