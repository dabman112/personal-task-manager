// src/TaskForm.jsx
import React, { useState } from "react";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Task title cannot be empty!");
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      description,
      priority,
      done: false,
    };

    onAddTask(newTask);
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>Add New Task</h2>
      <input
        type="text"
        placeholder="Task title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Task description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      {error && <p className="error">{error}</p>}
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
