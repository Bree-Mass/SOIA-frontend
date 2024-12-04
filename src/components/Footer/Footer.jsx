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
      if (window.scrollY > 700) {
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
      <div className="footer__links">
        <a
          className="footer__link footer__link_bluesky"
          href="https://bsky.app/profile/stateofitall.bsky.social"
        />
        <a
          className="footer__link footer__link_x-twitter"
          href="https://x.com/STATEofitALL"
        />
        <a
          className="footer__link footer__link_instagram"
          href="https://www.instagram.com/state_of_it_all/"
        />
        <a
          className="footer__link footer__link_patreon"
          href="https://www.patreon.com/c/StateofitAll/posts"
        />
      </div>
      <p className="footer__copyright">
        &copy; 2024 State of it All. <br /> All Rights Reserved.
      </p>

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
