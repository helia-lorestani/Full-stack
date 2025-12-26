import { useSelector } from "react-redux";
import React from "react";

function TaskList({ currentDirId }) {
  const tasks = useSelector((state) => state.tasks);
  const directories = useSelector((state) => state.directories);

  const filteredTasks = currentDirId
    ? tasks.filter((task) => task.directoryId === currentDirId)
    : tasks;

  return (
    <div>
      {filteredTasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        filteredTasks.map((task) => {
          const dir = directories.find((d) => d._id === task.directoryId);
          return (
            <div key={task._id} className="task-card">
              <h5>{task.title}</h5>
              <p>{task.description}</p>
              <small>Deadline: {task.deadline}</small>
              <br />
              <small>Directory: {dir ? dir.name : "Unknown"}</small>
              <br />
              {task.important && <span> Important</span>}
              {task.completed && <span> Completed</span>}
            </div>
          );
        })
      )}
    </div>
  );
}

export default TaskList;
