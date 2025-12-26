import Directory from "../model/directory.model.js";
import Task from "../model/task.model.js";

export const getDirectories = async (req, res) => {
  try {
    const dirs = await Directory.find();
    res.json(dirs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch directories" });
  }
};

export const addDirectory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Name is required" });
    }

    const dir = new Directory({ name });
    const saved = await dir.save();
    res.json(saved);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to add directory" });
  }
};

export const editDirectory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updated = await Directory.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Directory not found" });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to edit directory" });
  }
};

export const deleteDirectory = async (req, res) => {
  try {
    const { id } = req.params;

    await Task.deleteMany({ directoryId: id });

    const deleted = await Directory.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Directory not found" });

    res.json({ message: "Directory and its tasks deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to delete directory" });
  }
};
