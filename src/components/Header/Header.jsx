import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

import headerLogo from "../../assets/header-logo.png";
import "./Header.css";

const Header = ({ isLoggedIn }) => {
  return (
    <header className="header">
      <Link to="/">
        <img src={headerLogo} alt="header logo" className="header__logo" />
      </Link>
      <Navigation isLoggedIn={isLoggedIn} />
    </header>
  );
};

export default Header;
