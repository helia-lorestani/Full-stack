import { useSelector } from "react-redux";
import { useMemo } from "react";
import Card from "../components/Card";
import React from "react";

function AllTasksPage({
  onToggle,
  onToggleImportant,
  sortOption,
  searchQuery,
}) {
  const tasks = useSelector((state) => state.tasks);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tasks, searchQuery]);

  const sortedTasks = useMemo(() => {
    switch (sortOption) {
      case "earlier-first":
        return [...filteredTasks].sort(
          (a, b) => new Date(a.deadline) - new Date(b.deadline)
        );
      case "later-first":
        return [...filteredTasks].sort(
          (a, b) => new Date(b.deadline) - new Date(a.deadline)
        );
      case "completed-first":
        return [...filteredTasks].sort((a, b) =>
          a.completed === b.completed ? 0 : a.completed ? -1 : 1
        );
      case "uncompleted-first":
        return [...filteredTasks].sort((a, b) =>
          a.completed === b.completed ? 0 : a.completed ? 1 : -1
        );
      default:
        return filteredTasks;
    }
  }, [filteredTasks, sortOption]);

  return (
    <div>
      <h4>{`All tasks (${sortedTasks.length} tasks)`}</h4>
      <div className="list-card">
        {sortedTasks.map((task, index) => (
          <Card
            key={task._id}
            task={task}
            isFirst={index === 0}
            onToggle={onToggle}
            onToggleImportant={onToggleImportant}
          />
        ))}
      </div>
    </div>
  );
}
export default AllTasksPage;
