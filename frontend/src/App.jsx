import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { BACKEND } from "./constant";
function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    console.log("-->", BACKEND)
    try {
      const response = await axios.get(`${BACKEND}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Add a new task
  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask) return;

    try {
      const response = await axios.post(`${BACKEND}/tasks`, {
        task: newTask,
      });
      setTasks([...tasks, response.data]);
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="app">
      <div className="app-container">
        <h1>To-Do List</h1>
        <form onSubmit={addTask} className="task-form">
          <input
            type="text"
            placeholder="Add a new task"
            className="task-input"
            value={newTask}
            style={{ color: 'black' }}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button type="submit" className="add-task-button">Add Task</button>
        </form>
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">{task.task}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
