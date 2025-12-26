import express from "express";
import {
  getTasks,
  addTask,
  deleteTask,
  editTask,
  toggleCompleted,
  toggleImportant,
} from "../controllers/task.controller.js";

const router = express.Router();

router.get("/", getTasks);
router.post("/", addTask);
router.delete("/:id", deleteTask);
router.put("/:id", editTask);
router.patch("/:id/toggle-completed", toggleCompleted);
router.patch("/:id/toggle-important", toggleImportant);

export default router;
