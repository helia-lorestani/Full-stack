import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import { useSelector } from "react-redux";
import React from "react";

function HeaderComponent({
  sortOption,
  setSortOption,
  searchQuery,
  setSearchQuery,
}) {
  const today = new Date();
  const formattedDate = `${today.getFullYear()} ,${today.toLocaleString(
    "en-US",
    { month: "short" }
  )} ${today.getDate()}`;
  const [showModal, setShowModal] = useState(false);
  const directories = useSelector((state) => state.directories || []);
  const [currentDirId, setCurrentDirId] = useState("main");
  return (
    <div>
      <div>
        <p
          style={{
            position: "absolute",
            left: "50%",
            top: "40px",
            fontSize: "small",
            color: "rgba(73,65,65,1)",
            transform: "translateX(-50%)",
          }}
        >
          {formattedDate}
        </p>
        <div className="input-header" style={{ marginRight: "10px" }}>
          <img className="search-image" src="/search.svg" alt="" />
          <input
            className="search-input"
            type="text"
            placeholder="Search task"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <p
          className="main-title"
          style={{
            position: "absolute",
            left: "50%",
            top: "15px",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
            margin: 0,
            fontWeight: 600,
            fontSize: "medium",
          }}
        >
          TO-DO LIST
        </p>
      </div>

      <button className="button-small" onClick={() => setShowModal(true)}>
        Add new task
      </button>

      <div>
        <img className="view-1" src="/view-1.svg" alt="" />
        <img className="view-2" src="/view-2.svg" alt="" />
      </div>

      <select
        className="sidbar-select"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="order-added">Order added</option>
        <option value="earlier-first">Earlier first</option>
        <option value="later-first">Later first</option>
        <option value="completed-first">Completed first</option>
        <option value="uncompleted-first">Uncompleted first</option>
      </select>
      <AddTaskModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        currentDirId={currentDirId}
        directories={directories}
      />
    </div>
  );
}

export default HeaderComponent;
