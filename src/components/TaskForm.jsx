import React, { useState } from "react";

const TaskForm = ({ onAdd }) => {
  const [taskName, setTaskName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!taskName) return;
    onAdd(taskName);

    setTaskName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <button>+</button>
      <input
        type="text"
        placeholder="Your next task..."
        value={taskName}
        onChange={(e) => {
          setTaskName(e.target.value);
        }}
      />
    </form>
  );
};

export default TaskForm;
