import React from "react";
import { Link } from "react-router-dom";
import { ModalsContext } from "../../contexts/ModalsContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Navigation.css";

const Navigation = ({ isLoggedIn }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const modalContext = React.useContext(ModalsContext);
  return (
    <div className="navigation">
      <Link to="/book1" className="navigation__link">
        Book 1
      </Link>
      <Link to="/book2" className="navigation__link">
        Book 2
      </Link>
      {isLoggedIn ? (
        <Link to="/profile" className="navigation__link">
          My Profile
        </Link>
      ) : (
        <button
          id="login-modal"
          className="navigation__link"
          type="button"
          onClick={modalContext.openModals}
        >
          Log In
        </button>
      )}
      <Link to="/store" className="navigation__link">
        Store
      </Link>
      <button
        id="contact-modal"
        className="navigation__link"
        type="button"
        onClick={modalContext.openModals}
      >
        Contact
      </button>
    </div>
  );
};

export default Navigation;
