import React from "react";
import { Link } from "react-router-dom";
import { ModalsContext } from "../../contexts/ModalsContext";
import "./Navigation.css";

const Navigation = ({ isLoggedIn }) => {
  const modalContext = React.useContext(ModalsContext);
  return (
    <nav className="navigation">
      <Link to="/book1" className="navigation__link">
        Book 1
      </Link>
      <Link to="/book2" className="navigation__link">
        Book 2
      </Link>
      {isLoggedIn ? (
        <Link to="/profile" className="navigation__link">
          Profile
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
      <Link to="/about" className="navigation__link">
        Author
      </Link>
      <Link to="/contact" className="navigation__link">
        Contact
      </Link>
    </nav>
  );
};

export default Navigation;
