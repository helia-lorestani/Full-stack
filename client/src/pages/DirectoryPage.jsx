import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "../components/Card";

function DirectoryPage({ onToggle, onToggleImportant, searchQuery }) {
  const { dirName } = useParams();
  const directories = useSelector((state) => state.directories || []);
  const tasks = useSelector((state) => state.tasks || []);

  const dir = directories.find((d) => d.name === dirName);
  if (!dir) return <p>Directory not found</p>;

  const filteredTasks = tasks.filter((task) => task.directoryId === dir._id);

  const searchedTasks = filteredTasks.filter((task) =>
    (task.title || "").toLowerCase().includes((searchQuery || "").toLowerCase())
  );

  return (
    <div>
      {dir.name.toLowerCase() !== "main" && (
        <h4>
          {`${dir.name}'s tasks (${searchedTasks.length} ${
            searchedTasks.length === 1 ? "task" : "tasks"
          })`}
        </h4>
      )}

      <div className="list-card">
        {searchedTasks.map((task, index) => (
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

export default DirectoryPage;
