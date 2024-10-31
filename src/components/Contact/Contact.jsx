import React from "react";
import { ModalsContext } from "../../contexts/ModalsContext";
import "./Contact.css";

const Contact = () => {
  const modalContext = React.useContext(ModalsContext);
  return (
    <div className="contact">
      About The Author Here
      <button
        id="contact-modal"
        className="about__button" // change this classname later. this is a placeholder
        type="button"
        onClick={modalContext.openModals}
      >
        Contact
      </button>
    </div>
  );
};

export default Contact;
