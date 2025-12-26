import Card from "../components/Card";
import React from "react";

function CompletedPage({ tasks, onToggle, onToggleImportant, searchQuery }) {
  const completedTasks = tasks
    .filter((task) => task.completed)
    .filter((task) =>
      task.title.toLowerCase().includes((searchQuery || "").toLowerCase())
    );

  return (
    <div>
      <h4>{`Completed tasks (${completedTasks.length} tasks)`}</h4>
      <div className="list-card">
        {completedTasks.map((task, index) => (
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

export default CompletedPage;
