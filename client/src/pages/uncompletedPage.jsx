import Card from "../components/Card";
import React from "react";

function UnCompletedPage({ tasks, onToggle, onToggleImportant, searchQuery }) {
  const unCompletedTasks = tasks
    .filter((task) => !task.completed)
    .filter((task) =>
      task.title.toLowerCase().includes((searchQuery || "").toLowerCase())
    );

  return (
    <div>
      <h4>{`Uncompleted tasks (${unCompletedTasks.length} tasks)`}</h4>
      <div className="list-card">
        {unCompletedTasks.map((task, index) => (
          <Card
            key={task._id}
            task={task}
            isFirst={index === 0}
            onToggle={onToggle}
            onToggleImportant={onToggleImportant}
          />
        ))}
      </div>
    </div>
  );
}

export default UnCompletedPage;
