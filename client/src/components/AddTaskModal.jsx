import { Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTask } from "../store";

function AddTaskModal({ show, handleClose, currentDirId, directories = [] }) {
  const helperText = {
    title: {
      required: "Title is Required",
      minLength: "Your input should be more than 5 characters",
    },
    deadline: { required: "Date is Required" },
    directory: { required: "Directory is Required" },
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const selectedDirId = data.directory || currentDirId || directories[0]?._id;

    const newTask = {
      title: data.title,
      description: data.description || "",
      deadline: data.deadline,
      important: data.important || false,
      completed: data.completed || false,
      directoryId: selectedDirId,
    };

    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      if (!res.ok) throw new Error("Failed to add task");
      const savedTask = await res.json();

      dispatch(addTask(savedTask));
      reset();
      handleClose();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a task</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. study for the test"
              {...register("title", { required: true, minLength: 5 })}
            />
            {errors.title && (
              <Form.Text className="text-danger">
                {helperText.title[errors.title.type]}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              {...register("deadline", { required: true })}
            />
            {errors.deadline && (
              <Form.Text className="text-danger">
                {helperText.deadline[errors.deadline.type]}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description (optional)</Form.Label>
            <Form.Control as="textarea" rows={2} {...register("description")} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Select a directory</Form.Label>
            <Form.Select
              {...register("directory", { required: true })}
              defaultValue={currentDirId || directories[0]?._id}
            >
              {directories.map((dir) => (
                <option key={dir._id} value={dir._id}>
                  {dir.name}
                </option>
              ))}
            </Form.Select>
            {errors.directory && (
              <Form.Text className="text-danger">
                {helperText.directory[errors.directory.type]}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Check
            type="checkbox"
            label="Mark as Important"
            {...register("important")}
          />
          <Form.Check
            type="checkbox"
            label="Mark as Completed"
            {...register("completed")}
          />
        </Modal.Body>
        <Modal.Footer>
          <button className="modal-button">Add Task</button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddTaskModal;
