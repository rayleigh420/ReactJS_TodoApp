import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(123);
    let result = await axios.get("https://z0o0wo-3500.preview.csb.app/todos");
    console.log(result.data);
  };

  const newItemSection = (
    <form>
      <label htmlFor="new-todo">Enter a new todo item</label>
      <div className="new-todo">
        <input
          type="text"
          id="new-todo"
          placeholder="Enter new todo"
          value="Hello"
        />
      </div>
      <button className="submit" onClick={handleSubmit}>
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );

  return (
    <main>
      <h1>Todo List</h1>
      {newItemSection}
    </main>
  );
};
export default TodoList;
