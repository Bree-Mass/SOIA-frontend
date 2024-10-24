import Modal from "./Modal";
import "../blocks/Modal.css";
import "../blocks/ModalWithForm.css";

function FormModal({ children, titleText, buttonText, handleSubmit }) {
  return (
    <Modal titleText={titleText}>
      <form className="modal__form" onSubmit={() => console.log("submit")}>
        {children}
        <button
          className="modal__submit-button"
          type="submit"
          //   disabled={isButtonDisabled}
        >
          {buttonText}
        </button>
      </form>
    </Modal>
  );
}

export default FormModal;
