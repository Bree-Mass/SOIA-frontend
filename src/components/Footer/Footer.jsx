import React from "react";
import "./Footer.css";

const Footer = () => {
  const [isButtonVisible, setIsButtonVisible] = React.useState(false);
  const navigateButtonRef = React.useRef(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsButtonVisible(true);
      } else {
        setIsButtonVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer className="footer">
      <p className="footer__copyright">
        &copy; 2024 State of it All. All Rights Reserved.
      </p>
      <div className="footer__links">
        <a className="footer__link" href="" />
        <a className="footer__link" href="" />
        <a className="footer__link" href="" />
        <a className="footer__link" href="" />
      </div>

      <button
        className={`footer__navigate-button  ${
          isButtonVisible ? "footer__navigate-button_visible" : ""
        }`}
        ref={navigateButtonRef}
        onClick={scrollToTop}
      >
        &uarr;
      </button>
    </footer>
  );
};

export default Footer;
