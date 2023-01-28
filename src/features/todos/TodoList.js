import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getTodo,
  getTodoError,
  getTodoStatus,
  selectAllTodo,
} from "./todoSlice";
import AddTodoForm from "./AddTodoForm";

const TodoList = () => {
  const dispatch = useDispatch();

  const todos = useSelector(selectAllTodo);
  const todoStatus = useSelector(getTodoStatus);
  const error = useSelector(getTodoError);

  useEffect(() => {
    if (todoStatus == "idle") {
      dispatch(getTodo());
    }
  }, [todoStatus, dispatch]);

  const updateTodo = () => {};

  let content;
  if (todoStatus == "loading") {
    content = <p>Loading...</p>;
  } else if (todoStatus == "successed") {
    content = todos.map((todo) => {
      return (
        <article key={todo.id}>
          <div className="todo">
            <input
              type="checkbox"
              checked={todo.completed}
              id={todo.id}
              onChange={() =>
                updateTodo({ ...todo, completed: !todo.completed })
              }
            />
            <label htmlFor={todo.id}>{todo.title}</label>
          </div>
          <button className="trash">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </article>
      );
    });
  } else if (todoStatus == "failed") {
    content = <p>{error}</p>;
  }

  return (
    <main>
      <h1>Todo List</h1>
      <AddTodoForm />
      {/* {newItemSection} */}
      {content}
    </main>
  );
};
export default TodoList;
