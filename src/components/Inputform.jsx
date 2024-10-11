import { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

const Inputform = () => {
  const [textValue, setTextValue] = useState("");
  const [todo, setTodo] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const savedtodo = localStorage.getItem("todo");
    if (savedtodo) {
      setTodo(JSON.parse(savedtodo));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setTodo(
        todo.map((todo) =>
          todo.id === editingId ? { ...todo, textValue } : todo
        )
      );
      setEditingId(null);
    } else {
      setTodo([...todo, { textValue, id: self.crypto.randomUUID() }]);
    }

    setTextValue("");
  };

  const handleEdit = (id) => {
    const todoToEdit = todo.find((todo) => todo.id === id);
    if (todoToEdit) {
      setTextValue(todoToEdit.textValue);
      setEditingId(id);
    }
  };

  const handleRemove = (id) => {
    setTodo(todo.filter((todo) => todo.id !== id));
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          placeholder="Enter Todo Text"
        />
        <button type="submit">{editingId ? "Update" : "Add"}</button>
      </form>

      {todo.length > 0 ? (
        <ul>
          {todo.map((todo) => (
            <div className="listSection">
              <li key={todo.id}>{todo.textValue}</li>

              <MdEdit
                color="brown"
                size={25}
                onClick={() => handleEdit(todo.id)}
              />

              <MdDeleteForever
                size={25}
                color="red"
                onClick={() => handleRemove(todo.id)}
              />
            </div>
          ))}
        </ul>
      ) : (
        <p>List Not Found</p>
      )}
    </div>
  );
};

export default Inputform;
