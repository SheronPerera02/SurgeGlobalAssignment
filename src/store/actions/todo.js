import * as actionTypes from "./actionTypes";

export const addTodo = (id, title) => {
  return {
    type: actionTypes.ADD_TODO,
    todo: {
      id,
      title,
      statusCode: 1,
    },
  };
};

export const updateTodo = (id, statusCode) => {
  return {
    type: actionTypes.UPDATE_TODO,
    id,
    newStatusCode: statusCode + 1,
  };
};

export const deleteTodo = (id) => {
  return {
    type: actionTypes.DELETE_TODO,
    id,
  };
};
