import React from "react";
import { Link } from "react-router-dom";
import { ModalsContext } from "../contexts/ModalsContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import headerLogo from "../assets/header-logo.png";
import "../blocks/Header.css";

const Header = ({ isLoggedIn }) => {
  const modalContext = React.useContext(ModalsContext);
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <header className="header">
      <Link to="/">
        <img src={headerLogo} alt="header logo" className="header__logo" />
      </Link>
      <div className="header__links">
        <Link to="/book1" className="header__link">
          Book 1
        </Link>
        <Link to="/book2" className="header__link">
          Book 2
        </Link>
        {isLoggedIn ? (
          <Link to="/profile" className="header__link">
            My Profile
          </Link>
        ) : (
          <button
            id="login-modal"
            className="header__link"
            type="button"
            onClick={modalContext.openModals}
          >
            Log In
          </button>
        )}
        <Link to="/store" className="header__link">
          Store
        </Link>
        <button
          id="contact-modal"
          className="header__link"
          type="button"
          onClick={modalContext.openModals}
        >
          Contact
        </button>
      </div>
    </header>
  );
};

export default Header;
