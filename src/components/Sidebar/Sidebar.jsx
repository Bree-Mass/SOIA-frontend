import React from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Sidebar.css";

const Sidebar = ({ handleLogout }) => {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <Link to="info" className="sidebar__link">
        Info
      </Link>
      <Link to="comments" className="sidebar__link">
        Comments
      </Link>
      <button
        className="sidebar__link sidebar__link_logout"
        onClick={handleLogout}
      >
        Log Out
      </button>
    </div>
  );
};

export default Sidebar;
