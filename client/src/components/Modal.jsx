import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { addDirectory, editDirectory, deleteDirectory } from "../store";

function CreateDirectoryModal({ handleCreateShow, handleCreateClose }) {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleCreate = async () => {
    if (!title.trim()) return alert("Please enter a directory name.");

    try {
      const res = await fetch("http://localhost:5000/api/directories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: title }),
      });

      if (!res.ok) throw new Error("Failed to create directory");

      const newDir = await res.json();

      dispatch(addDirectory(newDir));

      setTitle("");
      handleCreateClose();
    } catch (err) {
      console.error("Error creating directory:", err);
      alert("Error creating directory. Check console.");
    }
  };

  return (
    <Modal show={handleCreateShow} onHide={handleCreateClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create new directory</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <label>Title</label>
        <input
          type="text"
          placeholder="Enter a directory name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control mt-2"
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleCreateClose}>
          Cancel
        </Button>
        <Button
          style={{
            backgroundColor: " rgb(97, 52, 193)",
            border: "solid  rgb(97, 52, 193)",
          }}
          onClick={handleCreate}
        >
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function EditDirectoryModal({ handleEditShow, handleEditClose, dir }) {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (dir) setTitle(dir.name || "");
  }, [dir]);

  const handleEdit = async () => {
    if (!dir || !dir._id) return alert("Directory not selected.");
    if (!title.trim()) return alert("Please enter a name.");

    try {
      const res = await fetch(
        `http://localhost:5000/api/directories/${dir._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: title }),
        }
      );

      if (!res.ok) throw new Error("Failed to edit directory");

      const updatedDir = await res.json();

      dispatch(editDirectory(updatedDir));

      handleEditClose();
    } catch (err) {
      console.error(" Error editing directory:", err);
      alert("Error editing directory. Check console.");
    }
  };

  return (
    <Modal show={handleEditShow} onHide={handleEditClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit directory name</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <label>Title</label>
        <input
          type="text"
          placeholder="Enter new name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control mt-2"
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleEditClose}>
          Cancel
        </Button>
        <Button
          style={{
            backgroundColor: " rgb(97, 52, 193)",
            border: "solid  rgb(97, 52, 193)",
          }}
          onClick={handleEdit}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function DeleteDirectoryModal({ handleDeleteShow, handleDeleteClose, dir }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (!dir || !dir._id) return alert("Invalid directory.");

    try {
      const res = await fetch(
        `http://localhost:5000/api/directories/${dir._id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Failed to delete directory");

      dispatch(deleteDirectory(dir._id));

      handleDeleteClose();
    } catch (err) {
      console.error(" Error deleting directory:", err);
      alert("Error deleting directory. Check console.");
    }
  };

  return (
    <Modal show={handleDeleteShow} onHide={handleDeleteClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          Directory <strong>{dir?.name}</strong> will be deleted permanently.
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleDeleteClose}>
          Cancel
        </Button>
        <Button
          style={{
            backgroundColor: " rgb(97, 52, 193)",
            border: "solid  rgb(97, 52, 193)",
          }}
          onClick={handleDelete}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function DeleteCardModal({
  handleDeleteShow,
  handleDeleteClose,
  onConfirm,
  taskId,
}) {
  return (
    <Modal show={handleDeleteShow} onHide={handleDeleteClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>This task will be deleted permanently</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleDeleteClose}>
          Cancel
        </Button>
        <Button
          style={{
            backgroundColor: " rgb(97, 52, 193)",
            border: "solid  rgb(97, 52, 193)",
          }}
          onClick={() => {
            onConfirm(taskId);
            handleDeleteClose();
          }}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export {
  CreateDirectoryModal,
  EditDirectoryModal,
  DeleteDirectoryModal,
  DeleteCardModal,
};
