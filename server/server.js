import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/connect.js";
import taskRoutes from "./routes/task.route.js";
import directoryRoutes from "./routes/directory.route.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);

app.use("/api/directories", directoryRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
