import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  deadline: Date,
  important: { type: Boolean, default: false },
  completed: { type: Boolean, default: false },
  directoryId: { type: String, required: true },
});

export default mongoose.model("Task", taskSchema);

