import { useState } from "react";
import Card from "../components/Card";
import AddTaskModal from "../components/AddTaskModal";
import React from "react";
import { useSelector } from "react-redux";

function MainPage({ tasks, onToggle, onToggleImportant, searchQuery }) {
  const directories = useSelector((state) => state.directories);
  const mainDir = directories.find((d) => d.name === "Main");
  const mainTasks = tasks
    .filter((task) => task.directoryId.toLowerCase() === "main")
    .filter((task) =>
      task.title.toLowerCase().includes((searchQuery || "").toLowerCase())
    );

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  return (
    <div>
      <h4>{`Main's tasks (${mainTasks.length} tasks)`}</h4>

      <div className="list-card">
        {mainTasks.map((task, index) => (
          <Card
            key={task._id}
            task={task}
            isFirst={index === 0}
            onToggle={onToggle}
            onToggleImportant={onToggleImportant}
          />
        ))}
      </div>

      <AddTaskModal
        show={showModal}
        handleClose={handleClose}
        currentDirId="main"
      />
    </div>
  );
}

export default MainPage;
