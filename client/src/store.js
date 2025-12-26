import { createSlice, configureStore } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    setTasks: (state, action) => action.payload,
    addTask: (state, action) => {
      state.push(action.payload);
    },
    deleteTask: (state, action) => {
      return state.filter((task) => task._id !== action.payload);
    },
    editTask: (state, action) => {
      const task = state.find((t) => t._id === action.payload._id);
      if (task) Object.assign(task, action.payload);
    },
    toggleCompleted: (state, action) => {
      const task = state.find((t) => t._id === action.payload);
      if (task) task.completed = !task.completed;
    },
    toggleImportant: (state, action) => {
      const task = state.find((t) => t._id === action.payload);
      if (task) task.important = !task.important;
    },
  },
});

const directoriesSlice = createSlice({
  name: "directories",
  initialState: [{ _id: "main", name: "Main" }], // ✅
  reducers: {
    setDirectories: (state, action) => action.payload,
    addDirectory: (state, action) => {
      state.push(action.payload);
    },
    editDirectory: (state, action) => {
      const dir = state.find((d) => d._id === action.payload._id);
      if (dir) dir.name = action.payload.name;
    },
    deleteDirectory: (state, action) => {
      return state.filter((d) => d._id !== action.payload);
    },
  },
});

export const {
  setTasks,
  addTask,
  deleteTask,
  editTask,
  toggleCompleted,
  toggleImportant,
} = tasksSlice.actions;

export const { setDirectories, addDirectory, editDirectory, deleteDirectory } =
  directoriesSlice.actions;

const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
    directories: directoriesSlice.reducer,
  },
});

export default store;
