import React from "react";
import Modal from "../Modal/Modal";
import { ModalsContext } from "../../contexts/ModalsContext";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  titleText,
  buttonText,
  isOpen,
  isButtonDisabled,
  handleSubmit,
  values,
}) {
  const modalContext = React.useContext(ModalsContext);
  const alternateButtonText = buttonText === "Log In" ? "Register" : "Login";
  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    handleSubmit(values);
  };

  return (
    <Modal titleText={titleText} isOpen={isOpen}>
      <form className="modal__form" onSubmit={handleFormSubmit}>
        {children}
        <div className="modal__form_buttons">
          <button
            className="modal__submit-button"
            type="submit"
            disabled={isButtonDisabled}
          >
            {buttonText}
          </button>
          {titleText === "Login" || titleText === "Register" ? "or" : null}
          {titleText === "Login" || titleText === "Register" ? (
            <button
              className="modal__submit-button"
              type="button"
              id={titleText === "Login" ? "register-modal" : "login-modal"}
              onClick={modalContext.openModals}
            >
              {alternateButtonText}
            </button>
          ) : null}
        </div>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
