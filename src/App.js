import { useEffect, useState } from "react";
import "./App.css";
import Task from "./components/Task";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);

  // Local Storage
  useEffect(() => {
    if (tasks?.length === 0) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage?.getItem("tasks"));
    setTasks(tasks);
  }, []);
  //

  function addTask(name) {
    setTasks((prev) => {
      if (!prev) {
        return [{ name: name, done: false }];
      } else {
        return [...prev, { name: name, done: false }];
      }
    });
  }

  function updateTaskDone(taskIndex, newDone) {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  }

  function removeTask(indexToRemove) {
    setTasks((prev) => {
      return prev.filter((taskObj, index) => {
        return index !== indexToRemove;
      });
    });
  }

  const numberComplete = tasks === 0 ? 0 : tasks?.filter((t) => t.done).length;
  const numberTotal = tasks === 0 ? 0 : tasks?.length;

  return (
    <main>
      <h1>
        {numberComplete}/{numberTotal} Complete
      </h1>
      <TaskForm onAdd={addTask} />
      {tasks?.map((task, index) => {
        return (
          <Task
            {...task}
            onToggle={(done) => updateTaskDone(index, done)}
            onTrash={() => {
              removeTask(index);
            }}
          />
        );
      })}
    </main>
  );
}

export default App;
