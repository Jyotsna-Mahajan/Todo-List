import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./TodoList.css";
import DeleteIcon from "@mui/icons-material/Delete";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function TodoList() {
  let [todos, setTodos] = useState([]);
  let [newTodo, setNewTodo] = useState("");

  let addNewTask = () => {
    if (newTodo.trim() === "") return; // stop empty input
    setTodos([...todos, { task: newTodo, id: uuidv4(), isDone: false }]);
    setNewTodo("");
  };
  let updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };

  let deleteTodo = (id) => {
    setTodos((prevTodos) => todos.filter((prevTodos) => prevTodos.id != id));
  };


  let MarkAsDone = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todos) => {
        if (todos.id == id) {
          return {
            ...todos,
            isDone: !todos.isDone,
          };
        } else {
          return todos;
        }
      })
    );
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Add a Task"
        value={newTodo}
        onChange={updateTodoValue}
      />
      <br />
      <button onClick={addNewTask}>Add a Task</button>

      <h4>Tasks to be Done</h4>
      <ul>
        {todos.map((todos) => (
          <li
            key={todos.id}
            style={{
              textDecoration: todos.isDone ? "line-through" : "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              {todos.isDone ? (
                <CheckCircleIcon
                  style={{
                    color: "green",
                    cursor: "pointer",
                    marginRight: "8px",
                  }}
                  onClick={() => MarkAsDone(todos.id)}
                />
              ) : (
                <RadioButtonUncheckedIcon
                  style={{
                    color: "#888",
                    cursor: "pointer",
                    marginRight: "8px",
                  }}
                  onClick={() => MarkAsDone(todos.id)}
                />
              )}
              {todos.task}
            </span>
            <DeleteIcon
              style={{ cursor: "pointer"}}
              onClick={() => deleteTodo(todos.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;