import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";

import { addTodo } from "./todoSlice";

const AddTodoForm = () => {
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      addTodo({
        userId: 1,
        title: newTodo,
        completed: false,
      })
    ).unwrap();
  };

  const changeTodo = (e) => setNewTodo(e.target.value);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter a new todo item</label>
      <div className="new-todo">
        <input
          type="text"
          id="new-todo"
          placeholder="Enter new todo"
          value={newTodo}
          onChange={changeTodo}
        />
      </div>
      <button className="submit">
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );
};

export default AddTodoForm;
