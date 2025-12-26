import React, { useState } from "react";
import { useSelector } from "react-redux";
import { DeleteCardModal } from "./Modal";
import EditTaskModal from "./EditTaskModal";

import { useDispatch } from "react-redux";
import { deleteTask, toggleCompleted, toggleImportant } from "../store";

function Card({ task, isFirst }) {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const directories = useSelector((state) => state.directories);
  const dir = directories.find((d) => d._id === task.directoryId);

  const handleDeleteTask = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete task");

      dispatch(deleteTask(id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div
      className="card"
      style={{
        width: "250px",
        height: "210px",
        padding: "10px",
        borderRadius: "10px",
        position: "relative",
        backgroundColor: isFirst ? "rgb(97, 52, 193)" : "white",
        color: isFirst ? "white" : "rgba(93, 82, 82, 1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginBottom: "25px",
        top: "-20px",
      }}
    >
      <span
        className="main-button"
        style={{
          position: "absolute",
          top: "-28px",
          right: "20px",
          padding: "3px 15px",
          borderRadius: "5px 5px 0px 0px",
          fontSize: "14px",
          color: "brown",
        }}
      >
        {dir ? dir.name : "Main"}
      </span>

      <div>
        <h6>{task.title}</h6>
        <p style={{ marginTop: "15px", fontSize: "small" }}>
          {task.description}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "-5px",
          gap: "10px",
        }}
      >
        <img
          src="/date.svg"
          alt="deadline icon"
          style={{ width: "20px", height: "20px" }}
        />
        <p style={{ fontSize: "small", margin: 0 }}>
          {new Date(task.deadline).toLocaleDateString("en-US")}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        - - - - - - - - - - - - - - - - - - - - - - - -
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          className={`completed ${task.completed ? "done" : ""}`}
          onClick={() => dispatch(toggleCompleted(task._id))}
        >
          <span
            className="text"
            title={task.completed ? "mark as uncompleted" : "mark as completed"}
          >
            {task.completed ? "completed" : "uncompleted"}
          </span>
          <span className="icon-completed">
            {task.completed ? (
              <img src="/check.svg" width={20} height={20} />
            ) : (
              <img src="/x.svg" width={20} height={20} />
            )}
          </span>
        </button>

        <div style={{ display: "flex", gap: "10px" }}>
          <i
            onClick={() => dispatch(toggleImportant(task._id))}
            className={`bi ${task.important ? "bi-star-fill" : "bi-star"}`}
            style={{
              color: task.important ? "brown" : "black",
              cursor: "pointer",
              width: "20px",
              height: "20px",
            }}
            title={task.important ? "unmark as important" : "mark as important"}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ")
                dispatch(toggleImportant(task._id));
            }}
          />
          <img
            onClick={() => setShowDeleteModal(true)}
            src="/trash.svg"
            alt="Delete task"
            style={{ width: "18px", height: "18px", cursor: "pointer" }}
            title="delete task"
          />
          <img
            onClick={() => setShowEditModal(true)}
            src="/options.svg"
            alt="Options"
            style={{ width: "18px", height: "18px", cursor: "pointer" }}
            title="edit task"
          />
        </div>
      </div>

      <DeleteCardModal
        handleDeleteShow={showDeleteModal}
        handleDeleteClose={() => setShowDeleteModal(false)}
        taskId={task._id}
        onConfirm={handleDeleteTask}
      />

      <EditTaskModal
        handleEditShow={showEditModal}
        handleEditClose={() => setShowEditModal(false)}
        task={task}
      />
    </div>
  );
}

export default Card;
