import mongoose from "mongoose";

const directorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export default mongoose.model("Directory", directorySchema);
