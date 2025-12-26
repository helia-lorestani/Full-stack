import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddTaskModal from "./AddTaskModal";
import {
  CreateDirectoryModal,
  EditDirectoryModal,
  DeleteDirectoryModal,
} from "./Modal";
import { deleteDirectory } from "../store";

function SidebarComponent() {
  const dispatch = useDispatch();
  const directories = useSelector((state) => state.directories || []);

  const [menuOpen, setMenuOpen] = useState(false);
  const [showDirectories, setShowDirectories] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dirToEdit, setDirToEdit] = useState(null);
  const [dirToDelete, setDirToDelete] = useState(null);
  const [currentDirId, setCurrentDirId] = useState("main");

  useEffect(() => {
    const handleClickOutside = (e) => {
      const sidebar = document.getElementById("sidebar");
      if (menuOpen && sidebar && !sidebar.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <>
      {!menuOpen && (
        <img
          className="hamburger-btn"
          src="/menu.svg"
          alt="menu"
          onClick={() => setMenuOpen(true)}
        />
      )}
      {menuOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      <div
        id="sidebar"
        className={`sidbar-container ${menuOpen ? "open" : ""}`}
      >
        <p
          className="sidbar-title"
          style={{
            padding: "20px 20px 5px 20px",
            position: "relative",
            left: "55px",
            fontSize: "large",
            zIndex: "10",
            color: "rgba(49, 47, 47, 1)",
            fontWeight: "500",
          }}
        >
          TO-DO LIST
        </p>

        <button
          className="task-button"
          style={{
            marginBottom: "20px",
            marginLeft: "10px",
            marginRight: "10px",
          }}
          onClick={() => setShowModal(true)}
        >
          Add new task
        </button>

        <div className="nav-container">
          <NavLink
            to="/all-tasks"
            style={({ isActive }) =>
              isActive
                ? {
                    color: "red",
                    borderRight: "3px solid red",
                    backgroundColor: "rgb(190, 190, 203)",
                    padding: "5px 20px",
                  }
                : { color: "rgba(73, 65, 65, 1)", padding: "5px 20px" }
            }
            className="nav-link"
          >
            All tasks
          </NavLink>
          <NavLink
            to="/important"
            style={({ isActive }) =>
              isActive
                ? {
                    color: "red",
                    borderRight: "3px solid red",
                    backgroundColor: "rgb(190, 190, 203)",
                    padding: "5px 20px",
                  }
                : { color: "rgba(73, 65, 65, 1)", padding: "5px 20px" }
            }
            className="nav-link"
          >
            Important tasks
          </NavLink>
          <NavLink
            to="/completed"
            style={({ isActive }) =>
              isActive
                ? {
                    color: "red",
                    borderRight: "3px solid red",
                    backgroundColor: "rgb(190, 190, 203)",
                    padding: "5px 20px",
                  }
                : { color: "rgba(73, 65, 65, 1)", padding: "5px 20px" }
            }
            className="nav-link"
          >
            Completed tasks
          </NavLink>
          <NavLink
            to="/uncompleted"
            style={({ isActive }) =>
              isActive
                ? {
                    color: "red",
                    borderRight: "3px solid red",
                    backgroundColor: "rgb(190, 190, 203)",
                    padding: "5px 20px",
                  }
                : { color: "rgba(73, 65, 65, 1)", padding: "5px 20px" }
            }
            className="nav-link"
          >
            Uncompleted tasks
          </NavLink>
        </div>
        <ul className="directories">
          <li>
            <div
              onClick={() => setShowDirectories(!showDirectories)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                padding: "1px 30px",
              }}
            >
              <span>
                <img
                  className="arrow"
                  src="/arrow.svg"
                  alt=""
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "-97px",
                    width: "15px",
                    height: "15px",
                    zIndex: "10",
                    transform: showDirectories
                      ? "rotate(180deg)"
                      : "rotate(90deg)",
                  }}
                />
              </span>
              <span
                style={{
                  position: "absolute",
                  left: "35px",
                  top: "-100px",
                  zIndex: "10",
                  color: "rgba(73, 65, 65, 1)",
                }}
              >
                Directories
              </span>
            </div>

            {showDirectories && (
              <ul
                style={{
                  listStyle: "none",
                  paddingLeft: "20px",
                  marginTop: "-65px",
                  marginLeft: "-10px",
                }}
              >
                {directories.map((dir, index) => (
                  <li className="li-directory" key={dir._id || index}>
                    <NavLink
                      className="dropDown-link"
                      to={`/directory/${dir.name}`}
                      style={({ isActive }) =>
                        isActive
                          ? {
                              color: "red",
                              borderRight: "3px solid red",
                              backgroundColor: "rgb(190, 190, 203)",
                            }
                          : undefined
                      }
                    >
                      <span
                        title={dir.name}
                        style={{ position: "relative", top: "6px" }}
                      >
                        {dir.name}
                      </span>

                      <div
                        style={{
                          visibility: dir._id === "main" ? "hidden" : "visible",
                          // display: dir.id === "main" ? "none" : "flex",
                          display: "flex",
                          gap: "8px",
                          position: "relative",
                          left: "80px",
                          bottom: "10px",
                        }}
                      >
                        <img
                          className="icon-directory"
                          src="/edit.svg"
                          alt="edit"
                          onClick={(e) => {
                            e.preventDefault();
                            setDirToEdit(dir);
                            setShowEditModal(true);
                          }}
                        />
                        <img
                          className="icon-directory"
                          src="/trash.svg"
                          alt="delete"
                          onClick={(e) => {
                            e.preventDefault();
                            setDirToDelete(dir);
                            setShowDeleteModal(true);
                          }}
                        />
                      </div>
                    </NavLink>
                  </li>
                ))}

                <li
                  onClick={() => setShowCreateModal(true)}
                  style={{
                    color: "rgba(73, 65, 65, 1)",
                    fontStyle: "italic",
                    border: "rgba(202, 186, 186, 1) dashed",
                    marginLeft: "10px",
                    display: "flex",
                    justifyContent: "center",
                    width: "70px",
                    marginTop: "6px",
                  }}
                >
                  <span
                    className="new"
                    style={{
                      cursor: "pointer",
                      transition: " all 0.3s ease",
                    }}
                  >
                    + New
                  </span>
                </li>
              </ul>
            )}
          </li>
        </ul>

        <CreateDirectoryModal
          handleCreateShow={showCreateModal}
          handleCreateClose={() => setShowCreateModal(false)}
        />

        <EditDirectoryModal
          handleEditShow={showEditModal}
          dir={dirToEdit}
          handleEditClose={() => setShowEditModal(false)}
        />

        <DeleteDirectoryModal
          handleDeleteShow={showDeleteModal}
          handleDeleteClose={() => setShowDeleteModal(false)}
          dir={dirToDelete}
          onConfirm={(id) => dispatch(deleteDirectory(id))}
        />

        <AddTaskModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          currentDirId={currentDirId}
          directories={directories}
        />
      </div>
    </>
  );
}

export default SidebarComponent;
