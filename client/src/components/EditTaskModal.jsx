import { Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { editTask } from "../store";
import { useEffect } from "react";
import React from "react";

function EditTaskModal({ handleEditShow, handleEditClose, task }) {
  const dispatch = useDispatch();
  const directories = useSelector((state) => state.directories);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      deadline: "",
      important: false,
      completed: false,
      directory: "main",
    },
  });

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description,
        deadline: task.deadline ? task.deadline.split("T")[0] : "",
        important: task.important,
        completed: task.completed,
        directory: task.directoryId,
      });
    }
  }, [task, reset]);

  const onSubmit = async (data) => {
    if (!task) return;

    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to update task");

      const updatedTask = await res.json();
      dispatch(editTask(updatedTask));
      handleEditClose();
    } catch (err) {
      console.error("Error updating task:", err);
      alert("Error updating task. Check console.");
    }
  };

  return (
    <Modal show={handleEditShow} onHide={handleEditClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              {...register("title", { required: true, minLength: 5 })}
            />
            {errors.title && (
              <Form.Text className="text-danger">
                Title is required and must be at least 5 characters.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={2} {...register("description")} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Deadline</Form.Label>
            <Form.Control
              type="date"
              {...register("deadline", { required: true })}
            />
            {errors.deadline && (
              <Form.Text className="text-danger">
                Deadline is required.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Directory</Form.Label>

            <Form.Select {...register("directory", { required: true })}>
              {directories.map((dir) => (
                <option key={dir._id} value={dir._id}>
                  {dir.name}
                </option>
              ))}
            </Form.Select>

            {errors.directory && (
              <Form.Text className="text-danger">
                Directory is required.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Check
            type="checkbox"
            label="Important"
            {...register("important")}
          />
          <Form.Check
            type="checkbox"
            label="Completed"
            {...register("completed")}
          />
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" className="modal-button">
            Save Changes
          </button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default EditTaskModal;
