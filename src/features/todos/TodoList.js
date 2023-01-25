import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");

  const newItemSection = (
    <form>
      <label htmlFor="new-todo">Enter a new todo item</label>
      <div className="new-todo">
        <input type="text" id="new-todo" placeholder="Enter new todo" />
      </div>
      <button className="submit">
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
