import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleCompleted,
  toggleImportant,
  setTasks,
  setDirectories,
} from "./store";
import HeaderComponent from "./components/Header";
import SidebarComponent from "./components/Sidebar";
import AllTasksPage from "./pages/AllTasksPage";
import ImportantPage from "./pages/ImportantPage";
import CompletedPage from "./pages/CompletedPage";
import UnCompletedPage from "./pages/UnCompletedPage";
import DirectoryPage from "./pages/DirectoryPage";
import MainPage from "./pages/MainPage";

function App() {
  const tasks = useSelector((state) => state.tasks);
  const directories = useSelector((state) => state.directories);
  const dispatch = useDispatch();

  const [sortOption, setSortOption] = useState("order-added");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchDirectories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/directories");
        const data = await res.json();
        dispatch(setDirectories(data));
      } catch (err) {
        console.error("Error fetching directories:", err);
      }
    };
    fetchDirectories();
  }, [dispatch]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/tasks");
        const data = await res.json();

        dispatch(setTasks(data));
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }, [dispatch]);

  const handleToggleCompleted = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/tasks/${id}/toggle-completed`,
        {
          method: "PATCH",
        }
      );
      if (!res.ok) throw new Error("Failed to toggle completed");
      dispatch(toggleCompleted(id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleImportant = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/tasks/${id}/toggle-important`,
        {
          method: "PATCH",
        }
      );
      if (!res.ok) throw new Error("Failed to toggle important");
      dispatch(toggleImportant(id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <BrowserRouter>
      <HeaderComponent
        sortOption={sortOption}
        setSortOption={setSortOption}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <SidebarComponent />

      <Routes>
        <Route path="/" element={<Navigate to="/directory/Main" />} />
        <Route
          path="/directory/Main"
          element={
            <MainPage
              tasks={tasks}
              directories={directories}
              searchQuery={searchQuery}
              onToggle={handleToggleCompleted}
              onToggleImportant={handleToggleImportant}
            />
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/directory/:dirName"
          element={
            <DirectoryPage
              tasks={tasks}
              directories={directories}
              onToggle={handleToggleCompleted}
              onToggleImportant={handleToggleImportant}
              searchQuery={searchQuery}
            />
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/all-tasks"
          element={
            <AllTasksPage
              tasks={tasks}
              onToggle={handleToggleCompleted}
              onToggleImportant={handleToggleImportant}
              sortOption={sortOption}
              searchQuery={searchQuery}
            />
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/important"
          element={
            <ImportantPage
              tasks={tasks}
              onToggle={handleToggleCompleted}
              onToggleImportant={handleToggleImportant}
              searchQuery={searchQuery}
            />
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/completed"
          element={
            <CompletedPage
              tasks={tasks}
              onToggle={handleToggleCompleted}
              onToggleImportant={handleToggleImportant}
              searchQuery={searchQuery}
            />
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/uncompleted"
          element={
            <UnCompletedPage
              tasks={tasks}
              onToggle={handleToggleCompleted}
              onToggleImportant={handleToggleImportant}
              searchQuery={searchQuery}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
