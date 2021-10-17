import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  todos: [],
};

const addTodo = (state, action) => {
  const updatedTodoArray = [...state.todos];
  updatedTodoArray.push(action.todo);
  return updateObject(state, { todos: updatedTodoArray });
};

const updateTodo = (state, action) => {
  const updatedTodoArray = [...state.todos];

  const index = state.todos.findIndex((todo) => {
    return todo.id === action.id;
  });

  updatedTodoArray[index] = updateObject(updatedTodoArray[index], {
    statusCode: action.newStatusCode,
  });
  return updateObject(state, { todos: updatedTodoArray });
};

const deleteTodo = (state, action) => {
  const filteredArray = state.todos.filter((todo) => {
    return todo.id !== action.id;
  });

  return updateObject(state, { todos: filteredArray });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TODO:
      return addTodo(state, action);
    case actionTypes.UPDATE_TODO:
      return updateTodo(state, action);
    case actionTypes.DELETE_TODO:
      return deleteTodo(state, action);
    default:
      return state;
  }
};

export default reducer;
