import express from "express";
import {
  getDirectories,
  addDirectory,
  deleteDirectory,
  editDirectory,
} from "../controllers/directory.controller.js";

const router = express.Router();

router.get("/", getDirectories);
router.post("/", addDirectory);
router.delete("/:id", deleteDirectory);
router.put("/:id", editDirectory);

export default router;
