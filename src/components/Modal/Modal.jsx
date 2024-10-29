import React from "react";
import { ModalsContext } from "../../contexts/ModalsContext";
import "./Modal.css";

const Modal = ({ children, titleText, isOpen }) => {
  const modalContext = React.useContext(ModalsContext);

  return (
    <div
      className={`modal ${isOpen ? `modal_opened` : ""}`}
      id={modalContext.activeModal}
    >
      <div
        className={`modal__content modal__content_${modalContext.activeModal}`}
      >
        <h2 className={`modal__title modal__title_${modalContext.activeModal}`}>
          {titleText}
        </h2>
        <button
          className="modal__close-button"
          type="button"
          onClick={modalContext.closeModals}
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
