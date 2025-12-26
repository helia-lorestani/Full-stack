import Card from "../components/Card";
import React from "react";

function ImportantPage({ tasks, onToggle, onToggleImportant, searchQuery }) {
  const importantTasks = tasks
    .filter((task) => task.important)
    .filter((task) =>
      task.title.toLowerCase().includes((searchQuery || "").toLowerCase())
    );

  return (
    <div>
      <h4>{`Important tasks (${importantTasks.length} tasks)`}</h4>
      <div className="list-card">
        {importantTasks.map((task, index) => (
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

export default ImportantPage;
