import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodo,
  getTodoError,
  getTodoStatus,
  selectAllTodo,
} from "./todoSlice";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");
  // const [todo, setTodo] = useState([]);
  // const isLoading = false;
  // const isSuccess = false;
  // const isError = false;

  const dispatch = useDispatch();

  const todos = useSelector(selectAllTodo);
  const todoStatus = useSelector(getTodoStatus);
  const error = useSelector(getTodoError);

  useEffect(() => {
    if (todoStatus == "idle") {
      dispatch(fetchTodo());
    }
  }, [todoStatus, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(123);
    // console.log(result.data);
  };

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter a new todo item</label>
      <div className="new-todo">
        <input
          type="text"
          id="new-todo"
          placeholder="Enter new todo"
          value={newTodo}
        />
      </div>
      <button className="submit">
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );

  let content;
  if (todoStatus == "loading") {
    content = <p>Loading...</p>;
  } else if (todoStatus == "successed") {
    content = todos.map((todo) => {
      //JSON.stringify(todos)
      return (
        <article key={todo.id}>
          <div className="todo">
            <input
              type="checkbox"
              checked={todo.completed}
              id={todo.id}
              // onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
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
      {newItemSection}
      {content}
    </main>
  );
};
export default TodoList;
