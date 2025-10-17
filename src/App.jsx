// src/App.jsx
import React, { useContext } from "react";
import TaskForm from "./TaskForm";
import useTasks from "./useTasks";
import { ThemeContext } from "./ThemeContext";
import "./App.css";

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { tasks, setTasks } = useTasks();

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const toggleDone = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className={`app-container ${theme}`}>
      <header>
        <h1>🧠 Personal Task Manager</h1>
        <button onClick={toggleTheme} className="theme-btn">
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </header>

      <TaskForm onAddTask={addTask} />

      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="empty">No tasks yet. Add one!</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className={`task-card ${task.done ? "done" : ""}`}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <span className={`priority ${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>
              <div className="actions">
                <button onClick={() => toggleDone(task.id)}>
                  {task.done ? "Undo" : "Done"}
                </button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
